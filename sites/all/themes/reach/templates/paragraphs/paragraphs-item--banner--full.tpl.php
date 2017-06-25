<?php

$bg = isset($variables['field_banner_image'][0]['uri']) ? $variables['field_banner_image'][0]['uri'] : NULL;
$bgurl = isset($bg) ? file_create_url($bg) : NULL;

?>
<div id="index-banner">
    <div class="container">
        <div class="row">
            <div class="intro-text col xl7 l7 m8 s8">
                <h1><?php print $variables['field_banner_title'][0]['value']; ?></h1>

                <h3><?php print $variables['field_banner_subtitle'][0]['value']; ?></h3>

            </div>
            <div class="col xl5 l5 m4 s4">
                <img src="<?php print $bgurl;?>">
            </div>
        </div><!--row-->
    </div>

</div>