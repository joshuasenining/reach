<?php
/**
 * @file
 * Default theme implementation for beans.
 *
 * Available variables:
 * - $content: An array of comment items. Use render($content) to print them all, or
 *   print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $title: The (sanitized) entity label.
 * - $url: Direct url of the current entity if specified.
 * - $page: Flag for the full page state.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity-{ENTITY_TYPE}
 *   - {ENTITY_TYPE}-{BUNDLE}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */

$banneruri = $content['field_banner_image'][0]['#item']['uri'];
$bannerurl = file_create_url($banneruri);
?>

<div id="index-banner">
    <div class="container">
        <div class="row">
            <div class="intro-text col xl7 l7 m8 s8">
                <h1><?php print $content['field_banner_title'][0]['#markup']; ?></h1>
                <h3><?php print $content['field_banner_subtitle'][0]['#markup'];?></h3>
            </div>
            <div class="col xl5 l5 m4 s4">
               
            
            <?php if (!empty($banneruri)): ?>
                <img src="<?php print $bannerurl;?>" class="pull-right responsive-img"/>
              <?php endif; ?>

            </div>
        </div><!--row-->
    </div>

</div>
