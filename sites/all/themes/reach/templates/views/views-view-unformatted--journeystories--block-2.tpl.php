<?php 

foreach ($view->result as $row) {

$title = $row->node_title;
$main_image = $row->field_field_image[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
$body = $row->field_body[0]['raw']['value'];
$link = $row->field_field_know_link[0]['raw']['value'];


?>


<div class="col xl6 l6 m12 s12">
           <div class="card">
               <div class="card-image">
                  <img src="<?php print $main_imageurl;?>" alt="" class="responsive-img"> 
               
              </div>
              <div class="card-content" data-equalizer-watch="otherjourney">
               
               <h6 class="bluetitle"><?php print $title;?></h6>
                <p><?php print $body;?></p>
              </div>
              <div class="card-action">

                  <a href="<?php print $link;?>" class="valign-wrapper"><span class="mck-icon__download"></span> PDF</a>
              </div>
          </div>



</div><!-- xl6-->
<?php
} 
 ?> 