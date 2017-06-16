<?php 

foreach ($view->result as $row) {

$title = $row->node_title;
$main_image = $row->field_field_thumbnail[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
$body = $row->field_field_bio_info[0]['raw']['value'];
$duration = $row->field_field_video_duration[0]['raw']['value'];
$videourl = $row->field_field_video[0]['rendered']['#markup'];


?>


 <div class="col xl3 l3 m6 s6">
                            <div class="card trigger" data-equalizer-watch="thoughts">
                              <div class="card-image">
                                   <a href="<?php print $videourl;?>" class="">
                                <div class="blue-overlay"></div>
                                 <img src="<?php print $main_imageurl;?>"/>
                                <span class="card-title valign-wrapper"><i class="material-icons">play_circle_outline</i> <?php print $duration;?></span>
                              </a>
                              </div>
                              <div class="card-content">
                                <h6>  <?php print $title;?></h6>
                                <p>  <?php print $body;?></p>
                              </div>
                            </div>
                        </div>


<?php

} 
 ?> 