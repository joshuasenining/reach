<?php 

foreach ($view->result as $row) {

$title = $row->node_title;
$main_image = $row->field_field_thumbnail[0]['rendered']['#item']['uri'];
$main_imageurl = file_create_url($main_image);
// $body = $row->field_field_lead_or_exp[0]['rendered']['#markup'];
$body = $row->field_field_title[0]['rendered']['#markup'];
$link = $row->field_field_know_link[0]['rendered']['#markup'];
$location = $row->field_field_tags[0]['rendered']['#markup'];

?>


 <div class="col xl4 l4 m6 s6">
                    <div class="card center">
                    	<a href="<?php print $link;?>" target="_blank">
                                  <img class="circle responsive-img" src="<?php print $main_imageurl;?>">
                               
                                <div class="card-content">
                                    <h6 class="name"><?php print $title;?></h6>
                                      <p><?php print $location;?></p>
                                     <p><?php print $body;?></p>
                                </div>
                        </a>
                    </div>
  </div>         
<?php
} 
 ?> 