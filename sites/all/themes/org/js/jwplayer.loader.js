define(['jqueryjs', 'require'], function($, require) {
    'use strict';

    // Test for jwplayer videos
    if ($('.jwplayer-video[data-video-url]')[0]) {

        require(['jwplayerjs'], function(jwplayer) {
            $('.jwplayer-video').each(function(i) {

                // add a child dom node with a unique id
                $(this).html('<div id="vid-container-' + i + '"></div>');

                var autostart = $(this).attr('data-video-autostart');
                var autoplay = $(this).attr('data-video-autoplay');
                autostart = typeof autostart !== 'undefined' && autostart !== "false";
                autoplay = typeof autoplay !== 'undefined' && autoplay !== "false";

                jwplayer('vid-container-' + i).setup({
                    flashplayer: require.toUrl('lib/jwplayer/player.swf'),
                    file: $(this).data('video-url'),
                    autostart: autostart || autoplay,
                    width: $(this).data('video-width') || 544,
                    height: $(this).data('video-height') || 360,
                    image: $(this).data('video-poster') || '',
                    skin: require.toUrl('lib/jwplayer/glow.zip')
                });
            });
        });
    }
});