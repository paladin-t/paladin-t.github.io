/*
** {===========================================================================
** Imports
*/

import * as THREE from 'three';

import TWEEN from 'three/addons/libs/tween.module.js'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

/* ===========================================================================} */

/*
** {===========================================================================
** Theme
*/

let lightTheme = true;
let setHandheldTheme = null;
do {
  const ELEMENTS = [
    '*',
    'html',
    'body',
    'h1', 'h2', 'h3', 'h4',
    'header',
    'header a',
    'footer',
    'footer h6',
    'footer li',
    'footer a:hover',
    '.footer_copyright p',
    '.banner',
    '.nav_compact ul',
    '.nav_compact li',
    '.active_nav_compact',
    '.nav_regular li',
    '.nav_regular a:hover',
    '.active_nav_regular',
    '.theme_btn',
    '.theme_btn_narrow',
    '.menu_burger',
    '.menu_burger::before',
    '.menu_burger::after',
    '.banner_title p',
    '.banner_title a',
    '.download_btn_steam',
    '.download_btn_itch',
    '.highlight_img',
    '.highlight_img_dark',
    '.highlight_content h2',
    '.highlight_content li',
    '.highlight_content li ul li',
    '.get_the_app',
    '.term_content h2',
    '.term_content li',
    '.technical_aspects > div',
    '.technical_aspects li',
    '.technical_aspects img',
    '.system_requirements',
    '.table_box',
    '.system_requirements td',
    '.system_requirements th',
    '.system_requirements table',
    '.system_requirements thead',

    '.term_content a',
    '.term_content h1',
    '.term_content li',
    '.term_content table',
  ];

  function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme != null)
      return localStorageTheme;

    if (systemSettingDark.matches)
      return 'dark';

    return 'light';
  }

  function onToggleTheme() {
    const newTheme = currentThemeSetting == 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    ELEMENTS.forEach(function (item) {
      const sel = document.querySelector(item);
      if (sel)
        sel.setAttribute('data-theme', newTheme);
    });
    if (setHandheldTheme) setHandheldTheme(newTheme);

    currentThemeSetting = newTheme;
  }

  const localStorageTheme = localStorage.getItem('theme');
  const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  lightTheme = currentThemeSetting == 'light';
  ELEMENTS.forEach(function (item) {
    const sel = document.querySelector(item);
    if (sel) sel.setAttribute('data-theme', currentThemeSetting);
  });

  const themeBtn = document.querySelector('.theme_btn');
  const themeNarrowBtn = document.querySelector('.theme_btn_narrow');
  themeBtn.addEventListener('click', onToggleTheme);
  themeNarrowBtn.addEventListener('click', onToggleTheme);
} while (false);

/* ===========================================================================} */

/*
** {===========================================================================
** Logo
*/

do {
  let stat = false;
  let auto = true;
  let tween = true;
  let light = lightTheme;
  let background = false;
  let bloom = true;
  let shadow = true;

  const container = document.getElementById('container');
  const canvas = document.getElementById('canvas');
  const obj = {
    animations: null,
    animationIndex: 0,
    animationTicks: 0,
    animationInterval: 0,
    cylinderOffset: 0,
    play: function (engine, index) {
      if (!this.animations)
        return;

      this.animationIndex = index;
      this.animationTicks = 0;
      const anim = this.animations[this.animationIndex];
      this.animationInterval = Math.random() * (anim.interval[1] - anim.interval[0]) + anim.interval[0];
      engine.meshFace.material.map = anim.frame;
    },
    onLoaded: function (engine) {
      // Setup the theme.
      engine.setTheme(light ? 'light' : 'dark');

      // Setup the face animation.
      const smileTex0 = engine.loaderTexture.load('smile0.png');
      smileTex0.wrapS = THREE.ClampToEdgeWrapping;
      smileTex0.wrapT = THREE.ClampToEdgeWrapping;
      smileTex0.flipY = false;
      const smileTex1 = engine.loaderTexture.load('smile1.png');
      smileTex1.wrapS = THREE.ClampToEdgeWrapping;
      smileTex1.wrapT = THREE.ClampToEdgeWrapping;
      smileTex1.flipY = false;

      this.animations = [
        {
          frame: smileTex0,
          interval: [ 1.5, 3.5 ]
        },
        {
          frame: smileTex0,
          interval: [ 0.12, 0.12 ]
        },
        {
          frame: smileTex1,
          interval: [ 0.08, 0.08 ]
        }
      ];
      this.animationInterval = 1.5;
      engine.meshFace.material.transparent = true;
      engine.meshFace.material.map = smileTex0;

      // Setup the tween procedures.
      if (tween) {
        let chain0 = null, chain1 = null, chain2 = null;
        do {
          const tween0 = new TWEEN.Tween({ y: 0 })
            .to({ y: 0.02 }, 400)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              smileTex0.offset.y = data.y;
              smileTex1.offset.y = data.y;
            });
          const tween1 = new TWEEN.Tween({ y: 0.02 })
            .to({ y: 0 }, 400)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              smileTex0.offset.y = data.y;
              smileTex1.offset.y = data.y;
            });
          const tween2 = new TWEEN.Tween({ y: 0 })
            .to({ y: -0.15 }, 3000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              smileTex0.offset.y = data.y;
              smileTex1.offset.y = data.y;
            });
          const tween3 = new TWEEN.Tween({ y: -0.15 })
            .to({ y: 0 }, 3000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              smileTex0.offset.y = data.y;
              smileTex1.offset.y = data.y;
            });
          chain0 = tween0.chain(tween1.chain(tween2.chain(tween3.chain(tween0)))).start();
        } while (false);
        do {
          const tween0 = new TWEEN.Tween({ x: 0 })
            .to({ x: Math.PI * 0.5 }, 4000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(engine.modelHandheld.rotation.x, Math.sin(data.x) * 0.2, 0);
            });
          const tween1 = new TWEEN.Tween({ x: Math.PI * 0.5 })
            .to({ x: 0 }, 4000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(engine.modelHandheld.rotation.x, Math.sin(data.x) * 0.2, 0);
            });
          const tween2 = new TWEEN.Tween({ x: 0 })
            .to({ x: -Math.PI * 0.5 }, 4000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(engine.modelHandheld.rotation.x, Math.sin(data.x) * 0.2, 0);
            });
          const tween3 = new TWEEN.Tween({ x: -Math.PI * 0.5 })
            .to({ x: 0 }, 4000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(engine.modelHandheld.rotation.x, Math.sin(data.x) * 0.2, 0);
            });
          chain1 = tween0.chain(tween1.chain(tween2.chain(tween3.chain(tween0)))).start();
        } while (false);
        do {
          const tween0 = new TWEEN.Tween({ y: 0 })
            .to({ y: Math.PI * 0.5 }, 5000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(Math.sin(data.y) * 0.2, engine.modelHandheld.rotation.y, 0);
            });
          const tween1 = new TWEEN.Tween({ y: Math.PI * 0.5 })
            .to({ y: 0 }, 5000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(Math.sin(data.y) * 0.2, engine.modelHandheld.rotation.y, 0);
            });
          const tween2 = new TWEEN.Tween({ y: 0 })
            .to({ y: -Math.PI * 0.5 }, 5000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(Math.sin(data.y) * 0.2, engine.modelHandheld.rotation.y, 0);
            });
          const tween3 = new TWEEN.Tween({ y: -Math.PI * 0.5 })
            .to({ y: 0 }, 5000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(Math.sin(data.y) * 0.2, engine.modelHandheld.rotation.y, 0);
            });
          chain2 = tween0.chain(tween1.chain(tween2.chain(tween3.chain(tween0)))).start();
        } while (false);

        let reset1 = null, reset2 = null;
        let down = false;
        function startTween() {
          if (down)
            return;
          down = true;
          chain1.stop();
          chain2.stop();
          reset1 = new TWEEN.Tween({ x: engine.modelHandheld.rotation.y })
            .to({ x: 0 }, 500)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(engine.modelHandheld.rotation.x, data.x, 0);
            })
            .start();
          reset2 = new TWEEN.Tween({ y: engine.modelHandheld.rotation.x })
            .to({ y: 0 }, 500)
            .easing(TWEEN.Easing.Elastic.Out)
            .onUpdate(function (data) {
              engine.modelHandheld.rotation.set(data.y, engine.modelHandheld.rotation.y, 0);
            })
            .start();
        }
        function endTween() {
          if (!down)
            return;
          down = false;
          reset1.stop(); reset1 = null;
          reset2.stop(); reset2 = null;
          chain1.start();
          chain2.start();
        }
        canvas.addEventListener('pointerdown', startTween);
        canvas.addEventListener('pointerup', endTween);
        canvas.addEventListener('pointercancel', endTween);
      }
    },
    onUpdated: function (engine, delta) {
      // Update the tween procedures.
      TWEEN.update();

      // Update the face animation.
      this.animationTicks += delta;
      if (this.animationTicks >= this.animationInterval) {
        this.animationTicks = 0;
        if (this.animationIndex == 2) { // Is the last frame.
          this.play(engine, Math.floor(Math.random() * 2)); // Pick a regular frame.
        } else {
          this.play(engine, Math.floor(Math.random() * 3)); // Pick any frame.
        }
      }

      // Update the background cylinder.
      if (engine.cylinderTex) {
        this.cylinderOffset += 0.5 * delta;
        if (this.cylinderOffset >= 1)
          this.cylinderOffset -= 1;
        engine.cylinderTex.offset.set(this.cylinderOffset, this.cylinderOffset * 0.5);
      }
    }
  };
  const ret = await run(canvas, {
    stat: stat,
    autoUpdate: auto,
    background: background,
    bloom: bloom,
    shadow: shadow,
    onLoaded: obj.onLoaded.bind(obj),
    onUpdated: obj.onUpdated.bind(obj)
  });
  const loading = document.getElementById('loading');
  loading.hidden = true;

  // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
  //   const theme = event.matches ? 'dark' : 'light';
  //   ret.setTheme(theme);
  // });
  setHandheldTheme = function (theme) {
    ret.setTheme(theme);
  };

  async function run(canvas, options) {
    // Prepare.
    const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;
    const BLOOM_SCENE = 1;

    options = options || { };

    const result = {
      ok: false,
      loaderTexture: null,
      loaderGltf: null,
      cylinderTex: null,
      modelHandheld: null,
      modelKeyboard: null,
      meshScreen: null,
      meshFace: null,
      controls: null,
      update: null,
      setTheme: null
    };

    let bloomPass = null;

    // Create the loaders.
    const loaderTexture = new THREE.TextureLoader().setPath('/kits/gbb/assets/');
    result.loaderTexture = loaderTexture;
    const loaderGltf = new GLTFLoader().setPath('/kits/gbb/assets/');
    result.loaderGltf = loaderGltf;

    // Create the renderer.
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1;
    if (options.shadow) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
    } else {
      renderer.shadowMap.enabled = false;
    }

    // Create the scene.
    const scene = new THREE.Scene();

    // Create the camera.
    const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.25, 20);
    camera.position.set(0, 0.6, 5.7);
    camera.lookAt(0, 0, 0);

    // Make the update function.
    let stats = null;
    if (options.stat) {
      stats = new Stats();
      stats.showPanel(0);
      document.body.appendChild(stats.dom);
    }

    const clock = new THREE.Clock();

    let render = function () {
      renderer.render(scene, camera);
    };

    function update() {
      if (options.stat)
        stats.begin();

      if (options.autoUpdate)
        requestAnimationFrame(update);

      const delta = clock.getDelta();
      if (options.onUpdated)
        options.onUpdated(result, delta);

      render();

      if (options.stat)
        stats.end();
    }
    result.update = update;

    // Create the lights.
    const lightHemi = new THREE.HemisphereLight(0xcccccc, 0x444444, 5);
    lightHemi.position.set(0, 200, 0);
    scene.add(lightHemi);

    const lightDir = new THREE.DirectionalLight(0xffffff, 5);
    lightDir.position.set(70, 6.5, 100);
    lightDir.castShadow = false;
    scene.add(lightDir);

    if (options.shadow) {
      const lightShadow = new THREE.DirectionalLight(0xffffff, 0);
      lightShadow.position.set(1.2, 2, 3);
      lightShadow.castShadow = true;
      lightShadow.shadow.camera.top = 2;
      lightShadow.shadow.camera.bottom = -2;
      lightShadow.shadow.camera.left = -2;
      lightShadow.shadow.camera.right = 2;
      lightShadow.shadow.camera.near = 0.01;
      lightShadow.shadow.camera.far = 10;
      lightShadow.shadow.bias = 0.001;
      lightShadow.shadow.mapSize.width = SHADOW_MAP_WIDTH;
      lightShadow.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
      scene.add(lightShadow);
    }

    // Create the background cylinder.
    if (options.background) {
      const cylinderTex = loaderTexture.load('cubes.png');
      cylinderTex.wrapS = THREE.RepeatWrapping;
      cylinderTex.wrapT = THREE.RepeatWrapping;
      cylinderTex.repeat.set(-2.4 * 5, 1.0 * 5);
      result.cylinderTex = cylinderTex;
      const cylinderGeo = new THREE.CylinderGeometry(7, 7, 12, 64);
      const cylinderMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        map: cylinderTex
      });
      const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
      cylinderMesh.position.set(0, -1, 0);
      cylinderMesh.castShadow = false;
      cylinderMesh.receiveShadow = false;
      scene.add(cylinderMesh);
    }

    // Create the ground to receive shadow.
    if (options.shadow) {
      const groundGeo = new THREE.PlaneGeometry(10, 10);
      const groundMat = new THREE.ShadowMaterial({
        color: 0x384846,
        opacity: 0.8
      });
      const groundMesh = new THREE.Mesh(groundGeo, groundMat);
      groundMesh.position.set(0, -1.5, 0);
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.castShadow = false;
      groundMesh.receiveShadow = true;
      scene.add(groundMesh);
    }

    // Load the mesh.
    result.modelHandheld = await {
      then(resolve, _reject) {
        loaderGltf.load('handheld.glb', async function (gltf) {
          // Prepare the model.
          const model = gltf.scene;
          await renderer.compileAsync(model, camera, scene); // Wait until the model can be added to the scene without blocking due to shader compilation.
          model.position.set(0, -0.73, 0);

          // Add the model to the scene.
          const obj = new THREE.Object3D();
          obj.position.set(0, 0, -0.015);
          obj.add(model);
          scene.add(obj);

          if (!options.autoUpdate)
            update();

          // Create the orbit controls.
          const controls = new OrbitControls(obj, renderer.domElement);
          if (!options.autoUpdate)
            controls.addEventListener('change', update); // Use if there is no animation loop.
          controls.target.set(0, 0, 0);
          controls.minDistance = 0;
          controls.maxDistance = 10;
          controls.minPolarAngle = Math.PI * 0.2;
          controls.maxPolarAngle = Math.PI * 0.8;
          controls.minAzimuthAngle = -Math.PI * 0.4 + Math.PI;
          controls.maxAzimuthAngle = Math.PI * 0.4 + Math.PI;
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.rotateLeft(Math.PI * 0.12);
          controls.update();
          result.controls = controls;

          // Add post effect.
          if (options.bloom) {
            model.traverse(function (obj) {
              if (!obj.isMesh)
                return;

              if (obj.name == 'Screen') {
                const color = new THREE.Color(0.065, 0.700, 0.007);
                const material = new THREE.MeshBasicMaterial({ color: color });
                obj.material.dispose();
                obj.material = material;
                obj.layers.enable(BLOOM_SCENE);
              }
              if (obj.name == 'Face') {
                const color = new THREE.Color(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({ color: color });
                obj.material.dispose();
                obj.material = material;
                obj.layers.enable(BLOOM_SCENE);
              }
              if (obj.name == 'Console_5') {
                const color = new THREE.Color(0.950, 0.050, 0.050);
                const material = new THREE.MeshBasicMaterial({ color: color });
                obj.material.dispose();
                obj.material = material;
                obj.layers.enable(BLOOM_SCENE);
              }
            });
          }

          // Enable shadow for the model.
          if (options.shadow) {
            model.traverse(function (obj) {
              if (!obj.isMesh)
                return;

              obj.castShadow = true;
              obj.receiveShadow = false;
            });
          }

          // Finish.
          const screen = model.getObjectByName('Screen');
          result.meshScreen = screen;

          const face = model.getObjectByName('Face');
          result.meshFace = face;

          resolve(model);
        });
      }
    };
    result.modelKeyboard = await {
      then(resolve, _reject) {
        loaderGltf.load('keyboard.glb', async function (gltf) {
          // Prepare the model.
          const model = gltf.scene;
          await renderer.compileAsync(model, camera, scene); // Wait until the model can be added to the scene without blocking due to shader compilation.
          model.position.set(0, -1.49, 0);

          // Add the model to the scene.
          const obj = new THREE.Object3D();
          obj.position.set(0.1, 0, 0.39);
          obj.rotation.set(0, 0.3, 0);
          obj.add(model);
          scene.add(obj);

          if (!options.autoUpdate)
            update();

          // Enable shadow for the model.
          if (options.shadow) {
            model.traverse(function (obj) {
              if (!obj.isMesh)
                return;

              obj.castShadow = true;
              obj.receiveShadow = true;
            });
          }

          // Finish.
          resolve(model);
        });
      }
    };

    result.setTheme = function (theme) {
      result.modelHandheld.traverse(function (obj) {
        if (!obj.isMesh)
          return;

        if (obj.name == 'Console_1') {
          const color = theme == 'dark' ? new THREE.Color(0.050, 0.050, 0.050) : new THREE.Color(0.800, 0.800, 0.800);
          obj.material.color = color;
        }
        if (obj.name == 'Console_3') {
          const color = theme == 'dark' ? new THREE.Color(0.500, 0.500, 0.500) : new THREE.Color(0.000, 0.000, 0.000);
          obj.material.color = color;
        }
        if (obj.name == 'Cartridge') {
          const color = theme == 'dark' ? new THREE.Color(0.050, 0.050, 0.050) : new THREE.Color(0.800, 0.800, 0.800);
          obj.material.color = color;
        }
      });
      result.modelKeyboard.traverse(function (obj) {
        if (!obj.isMesh)
          return;

        if (obj.name == 'Keyboard') {
          const color = theme == 'dark' ? new THREE.Color(0.050, 0.050, 0.050) : new THREE.Color(0.801, 0.780, 0.608);
          obj.material.color = color;
        }
        if (obj.name == 'Keys') {
          const color = theme == 'dark' ? new THREE.Color(0.500, 0.500, 0.500) : new THREE.Color(0.607, 0.800, 0.382);
          obj.material.color = color;
        }
        if (obj.name == 'Plane_A') {
          const color = theme == 'dark' ? new THREE.Color(0.050, 0.050, 0.050) : new THREE.Color(0.801, 0.780, 0.608);
          obj.material.color = color;
        }
      });
    };

    // Make a post effect.
    if (options.bloom) {
      const bloomParams = {
        threshold: 0.0,
        strength: 0.4,
        radius: 0.5,
        exposure: 0.9
      };

      const bloomLayer = new THREE.Layers();
      bloomLayer.set(BLOOM_SCENE);

      const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const materialCache = { };

      const renderScenePass = new RenderPass(scene, camera);

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(container.offsetWidth, container.offsetHeight),
        bloomParams.strength,
        bloomParams.radius,
        bloomParams.threshold
      );

      const bloomComposer = new EffectComposer(renderer);
      bloomComposer.renderToScreen = false;
      bloomComposer.addPass(renderScenePass);
      bloomComposer.addPass(bloomPass);

      const mixPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
          },
          vertexShader: document.getElementById('vertexshader').textContent,
          fragmentShader: document.getElementById('fragmentshader').textContent,
          defines: { }
        }), 'baseTexture'
      );
      mixPass.needsSwap = true;

      const outputPass = new OutputPass();

      const fxaaPass = new ShaderPass( FXAAShader );
      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.material.uniforms['resolution'].value.x = 1 / (container.offsetWidth * pixelRatio);
      fxaaPass.material.uniforms['resolution'].value.y = 1 / (container.offsetHeight * pixelRatio);

      const finalComposer = new EffectComposer(renderer);
      finalComposer.addPass(renderScenePass);
      finalComposer.addPass(mixPass);
      finalComposer.addPass(outputPass);
      finalComposer.addPass(fxaaPass);

      renderer.toneMappingExposure = Math.pow(bloomParams.exposure, 4.0);

      render = function () {
        scene.traverse(function (obj) { // Darken non-bloomed.
          if (obj.isMesh && !bloomLayer.test(obj.layers)) {
            materialCache[obj.uuid] = obj.material;
            obj.material = darkMaterial;
          }
        });
        bloomComposer.render();
        scene.traverse(function (obj) { // Restore material.
          if (materialCache[obj.uuid]) {
            obj.material = materialCache[obj.uuid];
            delete materialCache[obj.uuid];
          }
        });
        finalComposer.render();
      };
    }

    if (!options.autoUpdate)
      update();

    if (options.onLoaded)
      options.onLoaded(result);

    // Listen to the resize event.
    window.addEventListener('resize', function () {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      bloomPass.setSize(container.offsetWidth, container.offsetHeight);
      if (!options.autoUpdate)
        update();
    });

    // Start the update function.
    if (options.autoUpdate)
      update();

    // Finish.
    result.ok = true;

    return result;
  }
} while (false);

/* ===========================================================================} */

/*
** {===========================================================================
** Menu
*/

do {
  const menuBtn = document.querySelector('.menu_btn');
  const menuNav = document.querySelector('.nav_compact ul');
  const menuItems = document.querySelectorAll('.nav_compact li a');
  const bodyElement = document.querySelector('body');
  let isMenuOpened = false;

  function closeMenu() {
    menuBtn.classList.remove('open');
    menuNav.classList.remove('open');
    bodyElement.classList.remove('open');
    isMenuOpened = false;
  }

  function openMenu() {
    menuBtn.classList.add('open');
    menuNav.classList.add('open');
    bodyElement.classList.add('open');
    isMenuOpened = true;
  }

  menuBtn.addEventListener('click', function () {
    if (isMenuOpened)
      closeMenu();
    else
      openMenu();
  });

  menuItems.forEach(function (item) {
    item.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (!isMenuOpened)
      return;

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768)
      return;

    closeMenu();
  });
} while (false);

/* ===========================================================================} */
