<?php 

foreach ($view->result as $row) {

    $title = $row->node_title;
    $main_image = isset($row->field_field_thumbnail[0]['rendered']['#item']['uri']) ? $row->field_field_thumbnail[0]['rendered']['#item']['uri'] : NULL;
    $main_imageurl = isset($main_image) ? file_create_url($main_image) : NULL;
    $body = isset($row->field_field_bio_info[0]['raw']['value']) ? $row->field_field_bio_info[0]['raw']['value'] : NULL;
    $duration = isset($row->field_field_video_duration[0]['raw']['value']) ? $row->field_field_video_duration[0]['raw']['value'] : NULL;
    $videourl = isset($row->field_field_video[0]['rendered']['#markup']) ? $row->field_field_video[0]['rendered']['#markup'] : NULL;



    ?>

            <div class="card trigger">
                     <div class="card-image">
                        <a href="<?php print $videourl;?>" class="waves-effect">
                           <img src="<?php print $main_imageurl;?>"/>
                           <span class="card-title valign-wrapper">
                                  <i class="material-icons dp48">play_circle_outline</i>
                                  <b>Play Video </b>   <span> | <?php print $duration;?></span>
                            </span>
                        </a>
                    </div>
                    <div class="card-content">
                      <small>Video</small>
                      <h6><?php print $title;?></h6>
                        <p><?php print $body;?></p>
                    </div>
            </div>

<?php
} 
 ?> 