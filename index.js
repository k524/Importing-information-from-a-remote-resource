(function() {
    async function createArticleList(page = 1) {
        const container = document.getElementById('container');
        const ulArticles = document.createElement('ul');

        ulArticles.classList.add('list-group');
        container.append(ulArticles);

        const response = await fetch('https://gorest.co.in/public/v2/posts?page=' + String(page));
        const articleList = await response.json();

        articleList.forEach(artObject => {
            const articleElement = createArticleElement(artObject, page);
            ulArticles.append(articleElement);
        });

        createNavigation();
    };

    function createArticleElement(articleObject, page) {
        const item = document.createElement('li');
        const link = document.createElement('a');

        item.classList.add('list-group-item');
        item.append(link);

        link.setAttribute("href", "post.html?id=" + String(articleObject.id) + '?page=' + String(page));
        link.textContent = articleObject.title;

        return item
    };

    async function createPost(id, page) {
        const container = document.getElementById('container');
        const p = document.createElement('p');
        const h1 = document.createElement('h1');
        const ulComments = document.createElement('ul');
        const h2 = document.createElement('h2');

        ulComments.classList.add('list-group');

        const response = await fetch('https://gorest.co.in/public/v2/posts/' + String(id));
        const articleObject = await response.json();

        h1.textContent = articleObject.title;
        p.textContent = articleObject.body;
        h2.textContent = 'Комментарии';
        
        container.append(h1)
        container.append(p);
        container.append(h2);
        container.append(ulComments);

        const commetsResponse = await fetch('https://gorest.co.in/public-api/comments?post_id=' + String(id));
        const commentsList = await commetsResponse.json();
        const commentsObjects = commentsList.data;

        commentsObjects.forEach(artObject => {
            const commentsElement = document.createElement('li');
            const comentsAuthor = document.createElement('strong');
            const p = document.createElement('p');

            comentsAuthor.textContent = artObject.name;
            p.textContent = artObject.body;

            commentsElement.classList.add('list-group-item');

            ulComments.append(commentsElement);
            commentsElement.append(comentsAuthor);
            commentsElement.append(p);
        });
    };

    function createNavigation() {
        const container = document.getElementById('container');
        const ul = document.createElement('ul');

        ul.classList.add('nav');

        for (i = 1; i <= 20; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');

            li.classList.add('nav-item');
            a.classList.add('nav-link');
            a.setAttribute("href", "index.html?page=" + String(i));
            a.textContent = String(i);

            ul.append(li);
            li.append(a);
        }

        container.append(ul);
    }

    window.createArticleList = createArticleList;
    window.createPost = createPost;
})();