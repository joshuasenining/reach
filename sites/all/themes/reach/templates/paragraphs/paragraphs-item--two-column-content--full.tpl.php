<?php

$icon1uri = isset($content['field_iconx2'][0]['#item']['uri']) ? $content['field_iconx2'][0]['#item']['uri']: NULL;
$icon1url = isset($icon1uri) ? file_create_url($icon1uri) : NULL;

$icon2uri = isset($content['field_iconx2'][1]['#item']['uri']) ? $content['field_iconx2'][1]['#item']['uri']: NULL;
$icon2url = isset($icon2uri) ? file_create_url($icon2uri) : NULL;

?>
<div class="container">
<div class="row" data-equalizer="assessing" data-resize="assessing" data-mutate="assessing">
    <div class="col xl6 l6 m12 s12">

        <div class="" data-equalizer-watch="assessing" style="height: 141px;">
            <div class="col xl2 l2 m2 s3">  <img src="<?php print $icon1url;?>" class="responsive-img"></div>
            <div class="col xl10 l10 m10 s9">
                <h5 class="bluetext"><?php print $content['field_content_title'][0]['#markup']; ?></h5>

                <?php print $content['field_contentx2'][0]['#markup']; ?>

            </div>
        </div><!-- card-->



    </div><!--xl6-->
    <div class="col xl6 l6 m12 s12">
        <div class="" data-equalizer-watch="assessing" style="height: 141px;">
            <div class="col xl2 l2 m2 s3"><img src="<?php print $icon2url;?>" class="responsive-img"></div>
            <div class="col xl10 l10 m10 s9">
                <h5 class="bluetext"><?php print $content['field_content_title'][1]['#markup']; ?></h5>
                <?php print $content['field_contentx2'][1]['#markup']; ?>
            </div>
        </div><!-- card-->



    </div><!--xl6-->
</div></div>