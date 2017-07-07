<?php

$icon1uri = isset($content['field_iconx2'][0]['#item']['uri']) ? $content['field_iconx2'][0]['#item']['uri']: NULL;
$icon1url = isset($icon1uri) ? file_create_url($icon1uri) : NULL;

$icon2uri = isset($content['field_iconx2'][1]['#item']['uri']) ? $content['field_iconx2'][1]['#item']['uri']: NULL;
$icon2url = isset($icon2uri) ? file_create_url($icon2uri) : NULL;

$bluetext1 =  isset($content['field_content_title'][0]['#markup']) ? $content['field_content_title'][0]['#markup'] : NULL;
$textunderbluetext1 =  isset($content['field_contentx2'][0]['#markup']) ? $content['field_contentx2'][0]['#markup'] : NULL;

$bluetext2 =  isset($content['field_content_title'][1]['#markup']) ? $content['field_content_title'][1]['#markup'] : NULL;
$textunderbluetext2 = isset($content['field_contentx2'][1]['#markup']) ? $content['field_contentx2'][1]['#markup'] : NULL;
$anchor1 = isset($content['field_anchor_name'][0]['#markup']) ? $content['field_anchor_name'][0]['#markup'] : NULL;
$anchor2 = isset($content['field_anchor_name'][1]['#markup']) ? $content['field_anchor_name'][1]['#markup'] : NULL;

?>
<div class="twocolumns">
<div class="container">
<div class="row" data-equalizer="assessing" data-resize="assessing" data-mutate="assessing">
    <div class="col xl6 l6 m12 s12">

        <div class="card shadow" data-equalizer-watch="assessing">

            <?php if (!empty($icon1url)): ?>
                    <div class="col xl2 l2 m2 s3">  <img src="<?php print $icon1url;?>" class="responsive-img"></div>
            <?php endif; ?>

            
            <div class="col xl10 l10 m10 s9">
                <a href="#<?php print $anchor1; ?>" class="scrolling"><h5 class="bluetext"><?php print $bluetext1; ?></h5></a>

                <?php print $textunderbluetext1; ?>

            </div>
        </div><!-- card-->



    </div><!--xl6-->
    <div class="col xl6 l6 m12 s12">
        <div class="card shadow" data-equalizer-watch="assessing">
             <?php if (!empty($icon2url)): ?>
                    <div class="col xl2 l2 m2 s3">  <img src="<?php print $icon2url;?>" class="responsive-img"></div>
            <?php endif; ?>
          
                     <div class="col xl10 l10 m10 s9">
                         <a href="#<?php print $anchor2; ?>" class="scrolling"><h5 class="bluetext"><?php print $bluetext2; ?></h5></a>
                        <?php print $textunderbluetext2; ?>
                    </div>
          
        </div><!-- card-->



    </div><!--xl6-->
</div></div>
</div>