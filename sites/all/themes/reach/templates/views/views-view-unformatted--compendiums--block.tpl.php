<?php 

foreach ($view->result as $row) {

$title = $row->node_title;
$main_image = $row->field_field_image[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
$body = $row->field_body[0]['raw']['value'];
$image_caption = isset($row->field_field_image[0]['raw']['image_field_caption']['value']) ? $row->field_field_image[0]['raw']['image_field_caption']['value'] : NULL;


?>
<div class="item">  
    <div class="boxshadow">
            <div class="col xl6 l6 m6 s12">
                <small class="blue-text">Chapter</small>
                <h5><?php print $title;?></h5>
                <p><?php print $body;?></p>
            </div>
            <div class="col xl6 l6 m6 s12">
                <img src="<?php print $main_imageurl;?>" class="responsive-image"/>
               <?php if (!empty($image_caption)): ?>
                <p><?php print $image_caption;?></p>
              <?php endif; ?>

             
           



            </div>
    </div>


</div><!-- item-->
                          
<?php
} 
 ?> 