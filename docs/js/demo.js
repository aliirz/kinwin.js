document.addEventListener('DOMContentLoaded', () => {
    // Initialize syntax highlighting
    Prism.highlightAll();

    // DOM Manipulation Demos
    const contentDemo = kw('#content');
    contentDemo.on('click', () => {
        contentDemo.html('Content Changed! Click again to reset')
            .toggleClass('changed');
    });

    // Attribute Demo
    const attrDemo = kw('#attr-demo');
    attrDemo
        .attr('title', 'Hello from KinWin!')
        .attr({
            'data-type': 'interactive-demo',
            'aria-label': 'Attribute demonstration'
        });

    // Class Demo
    const classDemo = kw('.class-demo');
    classDemo.on('click', () => {
        classDemo
            .toggleClass('highlight')
            .toggleClass('active');
    });

    // Animation Demo
    const fadeDemo = kw('#fade-demo');
    fadeDemo.on('click', () => {
        fadeDemo.fadeOut(300).fadeIn(300);
    });

    // Form Demo
    const formDemo = kw('#demo-form');
    formDemo.on('submit', (e) => {
        e.preventDefault();
        const data = formDemo.serialize();
        kw('#form-output').html(JSON.stringify(data, null, 2));
    });

    // Add to your existing demo.js
    const clickDemo = kw('#click-demo');
    clickDemo.on('click', (e) => {
        clickDemo.toggleClass('active');
    });

    const listDemo = kw('#list-demo');
    const listItems = document.querySelectorAll('.list-item');

    listItems.forEach(item => {
        kw(item).on('click', (e) => {
            kw(e.target).toggleClass('selected');
        });
    });

    // Add new items dynamically
    let itemCount = 3;
    kw('#add-item').on('click', () => {
        itemCount++;
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.textContent = `List Item ${itemCount}`;
        
        // Add click handler to new item
        kw(newItem).on('click', (e) => {
            kw(e.target).toggleClass('selected');
        });
        
        listDemo.elements[0].insertBefore(newItem, kw('#add-item').elements[0]);
    });

    // Input event demo
    kw('#event-input').on('input', (e) => {
        kw('#input-value').html(e.target.value || 'Type something...');
    });

    // HTTP Demos
    kw('#get-demo').on('click', async () => {
        try {
            const data = await Http.get('https://jsonplaceholder.typicode.com/posts/1');
            kw('#get-result').html(JSON.stringify(data, null, 2));
        } catch (error) {
            kw('#get-result').html('Error: ' + error.message);
        }
    });

    kw('#post-demo').on('click', async () => {
        try {
            const data = await Http.post('https://jsonplaceholder.typicode.com/posts', {
                title: 'KinWin Demo',
                body: 'This is a test post',
                userId: 1
            });
            kw('#post-result').html(JSON.stringify(data, null, 2));
        } catch (error) {
            kw('#post-result').html('Error: ' + error.message);
        }
    });

    // Form Demos
    kw('#demo-form').on('submit', (e) => {
        e.preventDefault();
        const data = kw('#demo-form').serialize();
        kw('#form-result').html(JSON.stringify(data, null, 2));
    });

    kw('#demo-input').on('input', () => {
        const value = kw('#demo-input').val();
        kw('#input-result').html(`Current value: ${value}`);
    });

    // Animation Demos
    kw('#fade-trigger').on('click', async () => {
        const target = kw('#fade-demo');
        await target.fadeOut(300);
        await target.fadeIn(300);
    });

    kw('#slide-trigger').on('click', async () => {
        const target = kw('#slide-demo');
        await target.slideIn(500);
    });

    kw('#chain-trigger').on('click', async () => {
        const target = kw('#chain-demo');
        await target.fadeOut(300);
        await target.fadeIn(300);
        await target.slideIn(500);
    });
}); 