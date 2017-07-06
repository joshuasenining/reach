<?php

$uri = isset($element['#items'][0]['uri']) ? $element['#items'][0]['uri'] : NULL;
$url = isset($uri) ? file_create_url($uri) : NULL;

?>
<a href="<?php print $url;?>" class="fancybox" data-fancybox="images" >
    <img class="trigger-zoom" src="<?php print $url;?>">
</a>

