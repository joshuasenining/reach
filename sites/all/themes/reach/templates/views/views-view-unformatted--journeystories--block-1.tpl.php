<?php 

foreach ($view->result as $row) {

$title = $row->node_title;
$main_image = $row->field_field_thumbnail[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
$body = $row->field_field_bio_info[0]['raw']['value'];




?>


 <div class="col xl4 l6 m12 s12">
                    <div class="card center" data-equalizer-watch="sp">
                                  <img class="circle responsive-img" src="<?php print $main_imageurl;?>">
                               
                                <div class="card-content">
                                    <h6 class="name"><?php print $title;?></h6>
                                
                                     <p><?php print $body;?></p>
                                </div>
                    </div>
</div>

                    
<?php
} 
 ?> 