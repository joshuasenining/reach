<?php 

foreach ($view->result as $row) {

$title = $row->node_title;
$main_image = $row->field_field_thumbnail[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
$body = $row->field_field_bio_info[0]['raw']['value'];
$link = isset($row->field_field_know_link[0]['raw']['value']) ? $row->field_field_know_link[0]['raw']['value'] : NULL;

?>


<!--  <div class="col xl12 l12 m12 s12">
                    <div class="card center" data-equalizer-watch="sp">
                                  <a href="<?php print $link;?>">
                                  <img class="circle responsive-img" src="<?php print $main_imageurl;?>">
                               	
                                <div class="card-content">
                                    <h6 class="name"><?php print $title;?></h6>
                                
                                     <p><?php print $body;?></p>
                                </div>
                                </a>
                    </div>
</div> -->
 <div class="col xl12 l12 m12 s12">
  <div class="valign-wrapper">
     
            <a href="<?php print $link;?>">
                                  <img class="circle responsive-img" src="<?php print $main_imageurl;?>">
            </a>

      
          <div class="card-content">
                                    <h6 class="name"><?php print $title;?></h6>
                                
                                     <p><?php print $body;?></p>
                                </div>
      </div>
 
  <hr>
               
</div>
                    
<?php
} 
 ?> 