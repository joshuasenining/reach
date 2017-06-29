<?php

foreach ($view->result as $row) {
    ddl($row);
    $title = $row->node_title;
    $main_image = $row->field_field_thumbnail[0]['rendered']['#item']['uri'];
    $main_imageurl = file_create_url($main_image);
    $body = $row->field_field_title[0]['rendered']['#title'];




    ?>


    <div class="col xl3 l4 m6 s6">
        <div class="card center">
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