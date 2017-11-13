<?php

/**
 * @file
 * Default theme implementation for a single paragraph item.
 *
 * Available variables:
 * - $content: An array of content items. Use render($content) to print them
 *   all, or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity
 *   - entity-paragraphs-item
 *   - paragraphs-item-{bundle}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened into
 *   a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
//kpr($content);


$image = isset($content['field_thumbnail']) ? render($content['field_thumbnail']) : '';
//$linktitle= isset($content['field_links'][0]['#element']['title']) ? render($content['field_links'][0]['#element']['title']) : '';
//$linksurl = isset($content['field_links'][0]['#element']['url']) ? $content['field_links'][0]['#element']['url']: NULL;
$des = isset($content['field_content']) ? render($content['field_content']) : '';
$linktitle = isset($content['field_link']) ? render($content['field_link']) : '';

?>
<?php echo $image; ?>
<?php echo $des; ?>
<?php echo $linktitle; ?>
     <div class="col-lg-4 col-sm-6">
  <div class="mdl-assets">     
 					<div class="valign-wrapper">
        			<span><?php echo $image; ?></span>
             
                  
                     <span class="links-container">
                     <?php echo $linktitle; ?> 
                      </span>
                    </div>

               
             
                </div>
      
           
</div>
         
 