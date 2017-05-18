<?php 
  $theme_url = variable_get('theme_url', '');
  $base_url = variable_get('base_url', '');
?>
  <div id="wrapper">
    <!-- Header Starts -->
       <?php print render($page['header']); ?>
    <!-- Header Ends -->
    
    <!-- Main Page Content Starts. -->
    <div id="main">
    
      <h1><?php echo $title; ?></h1> 
      <?php 
        $featured_img = $node -> field_featured_image ["und"]["0"]["uri"];  
        $featured_img_link  = $node -> field_featured_image_link_if_any ["und"]["0"]["value"]; 
      if (isset($featured_img)) {?>
        <div id="intro-top">
          <?php 
              $file_path = file_create_url($featured_img);

              if (isset ($featured_img_link)) {
                print '<a href="'.$featured_img_link.'"><img src="'.$file_path .'" alt="Image Details" width="690" height="180" /></a>';
              }
              else {
                print '<img src="'.$file_path .'" alt="Image Details" width="690" height="180" />';
              
              }
          ?>
          
        </div>
      <?php } ?>
      
      <div id="twocolumns">
          
        <div id="content">
          
          <?php print render($page['content']); ?>
        </div>
        <div id="sidebar">
          <?php print render($page['sidebar_first']); ?>
        </div>

      </div>
    </div>
    <div id="footer">
        <?php print render($page['footer']); ?>
    </div>
  </div>
  <div class="tabs"><?php print render($tabs); ?></div>