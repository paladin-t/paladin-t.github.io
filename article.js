(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.Article = { });
  }
} (this, function (exports) {
  var host = 'https://api.github.com/';

  function args (url, args) {
    if (!args)
      return url;

    var result = url + '?';
    for (var key in args) {
      if (args.hasOwnProperty(key))
        result += key.toString() + '=' + args[key].toString();
    }

    return result;
  }

  function render (markdown) {
    /*var url = host + 'markdown';

    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({ text: markdown })
    }).then(function (rsp) {
      return rsp.text();
    });*/

    return Promise.resolve(marked(markdown));
  }

  function article (author, repo, id) {
    var url = host + 'repos/' + author + '/' + repo + '/issues/' + id.toString();

    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (rsp) {
      return rsp.json();
    });
  }

  function labels (author, repo, id) {
    var url = host + 'repos/' + author + '/' + repo + '/issues/' + id.toString() + '/labels';
    url = args(url, { per_page: 100, page: 0 });

    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (rsp) {
      return rsp.json();
    });
  }

  function comments (author, repo, id) {
    var url = host + 'repos/' + author + '/' + repo + '/issues/' + id.toString() + '/comments';
    url = args(url, { per_page: 100, page: 0 });

    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (rsp) {
      return rsp.json();
    });
  }

  function attach (node, html) {
    if (typeof node == 'string')
      node = document.getElementById(node);
    node.innerHTML = html;

    return node;
  }

  function read (author, repo, id, nodes) {
    return article(author, repo, id)
      .then(function (data) {
        var userAvatar = data.user.avatar_url;
        var userUrl = data.user.html_url;
        var title = data.title;
        var url = data.html_url;
        var body = data.body;
        var updatedAt = data.updated_at;

        document.title = title + ' | Tony Wang';

        attach(nodes.avatar, '<a href="' + userUrl + '" target="_blank">' + '<img src="' + userAvatar + '" id="avatar">' + '</a>');
        attach(nodes.title, title);

        labels(author, repo, id)
          .then(function (labels) {
            var html = '';
            labels.map(function (label) {
              html += '<div class="article-label" style="background-color: #' + label.color + ';">';
                html += label.name;
              html += '</div>';
            });
            html += '<a class="article-original" href="' + url + '" target="_blank">Read on GitHub</a>';
            html += '<div class="article-timestamp">Last update: ';
              html += updatedAt;
            html += '</div>';
            attach(nodes.labels, html);
          });

        comments(author, repo, id)
          .then(function (comments) {
            var html = '';
            comments.map(function (comment, index) {
              var userAvatar = comment.user.avatar_url;
              var userUrl = comment.user.html_url;
              var userName = userUrl.substr(userUrl.lastIndexOf('/') + 1);
              var body = comment.body;
              var createdAt = comment.created_at;
              var updatedAt = comment.updated_at;
              var id = 'article-comment-' + index.toString();

              html += '<div>';
                html += '<div class="article-commenter-container">';
                  html += '<div class="article-commenter-left">';
                    html += '<div class="article-commenter-avatar">';
                      html += '<a href="' + userUrl + '" target="_blank">' + '<img src="' + userAvatar + '" class="article-commenter-avatar">' + '</a>';
                    html += '</div>';
                  html += '</div>';
                  html += '<div class="article-commenter-right">';
                    html += '<a href="' + userUrl + '" target="_blank">' + userName + '</a>';
                    html += ' posted at ';
                    html += createdAt;
                  html += '</div>';
                  html += '<div id="' + id + '"></div>';
                html += '</div>';
                html += '<div class="article-timestamp">Last update: ' + updatedAt + '</div>';
              html += '</div>';
              html += '<hr class="hr">';

              render(body)
                .then(function (html) {
                  html = nodes.preprocess(html);
                  attach(id, html);
                  nodes.highlight();
                });
            });
            if (comments.length == 0) {
              html += 'No comments yet.';
              html += '<hr class="hr">';
            }
            html += '<a href="' + url + '#issuecomment-new" target="_blank">Leave a comment...</a>';
            attach(nodes.comments, html);
          })
          .catch(function (_) {
            var url = 'https://github.com/' + author + '/' + repo + '/issues/' + id.toString();
            var html = 'Oops, cannot load comments for the moment...<br>Try refersh or ';
            html += '<a href="' + url + '" target="_blank">click</a>';
    
            attach(nodes.comments, html);
          });

        return render(body)
          .then(function (html) {
            html = nodes.preprocess(html);
            attach(nodes.content, html);
            nodes.highlight();

            var rss = '<a href="all.xml" target="_blank">';
              rss += '<div class="article-label" style="background-color: #ffa500;">';
                rss += '<img align="center" src="../imgs/rss.svg" style="width: 14px;">';
                rss += '<div align="center" style="color: white;">RSS</div>';
              rss += '</div>';
            rss += '</a>';
            attach(nodes.rss, rss);
          });
      })
      .catch(function (_) {
        var url = 'https://github.com/' + author + '/' + repo + '/issues/' + id.toString();
        var html = 'Oops, cannot load article for the moment...<br>Try refersh or ';
        html += '<a href="' + url + '" target="_blank">' + click + '</a>';

        attach(nodes.content, html);
        attach(nodes.comments, 'Cannot load comments...');
      });
  }

  exports.render = render;
  exports.article = article;
  exports.labels = labels;
  exports.comments = comments;
  exports.attach = attach;
  exports.read = read;
}));
