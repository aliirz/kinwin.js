document.addEventListener('DOMContentLoaded', () => {
    // Initialize syntax highlighting
    Prism.highlightAll();

    // Live demo functionality
    const button = kw('#demo-button');
    const output = kw('#demo-output');

    button
        .attr('title', 'Click to test')
        .addClass('demo-button')
        .on('click', () => {
            output
                .html('🎉 KinWin is working!')
                .addClass('active');
            
            // Reset after 2 seconds
            setTimeout(() => {
                output
                    .html('Click the button to see KinWin in action')
                    .removeClass('active');
            }, 2000);
        });
}); 