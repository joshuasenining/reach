<?php 
foreach ($view->result as $row) {

$title = $row->node_title;
$category = $row->field_field_category[0]['raw']['taxonomy_term']->name;
$main_image = $row->field_field_image[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
$body = $row->field_body[0]['raw']['value'];
$link = isset($row->field_field_know_link[0]['raw']['value']) ?  $row->field_field_know_link[0]['raw']['value']: NULL;
//$link = $row->field_field_know_link[0]['raw']['value'];
//$doclink = $row->field_field_document[0]['raw']['uri'];
$doclink =isset($row->field_field_document[0]['raw']['uri']) ?  $row->field_field_document[0]['raw']['uri']: NULL;
$doclinkurl = file_create_url($doclink);
$fileext = preg_replace('/^[^.]*.\s*/', '', $doclink);

?>


<div class="col xl3 l4 m6 s6">
           <div class="card" data-equalizer-watch="upcomingevents">
               <div class="card-image">
                  <img src="<?php print $main_imageurl;?>" alt="" class="responsive-img"> 
               
              </div>
              <div class="card-content">
              <small><?php print $category; ?></small>
               <h6 class="bluetitle"><?php print $title;?></h6>
                <p><?php print truncate_utf8 ($body,90,TRUE,TRUE) ;?></p>
              </div>
              <?php if (!empty($doclink)): ?>
                <div class="card-action">
                  <a href="<?php print $doclinkurl;?>" class="valign-wrapper"><span class="mck-icon__download"></span> <?php print $fileext ;?></a>
              </div>
              <?php endif; ?>
             
          </div>



</div><!-- xl6-->
<?php
} 
 ?> 