<?php
/**
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   - view-mode-[mode]: The view mode, e.g. 'full', 'teaser'...
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 *   The following applies only to viewers who are registered users:
 *   - node-by-viewer: Node is authored by the user currently viewing the page.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content. Currently broken; see http://drupal.org/node/823380
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see zen_preprocess_node()
 * @see template_process()
 */
  $theme_url = variable_get('theme_url', '');
  $base_url  = variable_get('base_url', '');
?>

 <!-- 
 <div class="row entry">
     
     <img class="col-xs-3" src="./images/light-bulb.jpg"/>

     <div class="col-xs-9">
     <h4>Global Business Services Forum #10</h4>
     <h5>Forum date:</h5>
     <h6>November 12, 2013</h6>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec pharetra mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin ut elit pulvinar, ultrices tortor non, tincidunt odio. Nulla facilisi. 
     <a href="#">View full forum details »</a>
     </p>
     <ul class="vertical entry">
     <li><a href="#"><img src="./images/download.png"/>Download full presentation</a></li>
     <li><a href="#"><img src="./images/share.png"/>Share</a></li>
     </ul>
     
 </div>
entry end -->


<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>

    
    <div class="row entry">
      
       <div class="col-xs-12">

          <?php echo render($title_prefix); ?>
          <?php if ($title): ?>
            <h2 class="title" id="page-title"><?php echo $title; ?></h2>
             
             <ul class="vertical entry right light small-font">
                <li><a href="#">104 views</a></li>
                <li><a href="#">54 likes &nbsp;&nbsp;<img src="<?php echo $theme_url; ?>/images/check_orange.png"/></a></li>
             </ul> 
          
          <?php endif; ?>
          <?php echo render($title_suffix); ?>
      
         
          <?php 
            //hide($content['field_video']);
            $obj = entity_metadata_wrapper('node', $node);
            
            $field_video_duration = field_get_items('node', $node, 'field_video_duration');
            $field_video          = field_get_items('node', $node, 'field_video');
            $field_video_author   = field_get_items('node', $node, 'field_video_author');
            //$field_video_programs = field_get_items('node', $node, 'field_video_programs');
            //$field_video_tags     = field_get_items('node', $node, 'field_video_tags');
            $field_video_program  = $obj->field_video_program->value();
            $field_video_tags     = $obj->field_video_tags->value();
            $field_video_supporting_documents = field_get_items('node', $node, 'field_video_supporting_documents');
            $field_summary = field_get_items('node', $node, 'body');
            
           
           

            print render($content['field_video']);
           //print_r($field_video);
            //echo $field_video[0]['value'];
          ?> 

          <div class="video-footnotes">

            <ul class="vertical left small-font">
                <li><img src="<?php echo $theme_url; ?>/images/playlist_orange.png"/><a href="#">Add to Playlist</a></li>
                <li class="remove-side-border"><a href="#">Recommend to Colleague</a></li>

                <li class="f-right grey-text">
                  <img src="<?php echo $theme_url; ?>/images/clock_orange.png"><?php print $field_video_duration[0]['value'] ;?></li>
            </ul> 
            

          </div>
          <div class="video-description border-top">

              <p><span class="bold-font dark-text">Author: </span><?php print $field_video_author[0]['value'];?></p>
              <div class="f-length">
                  <div class="f-left grey-text sixty-five border-right xpadding-right"><?php print $field_summary[0]['safe_value'] ;?></div>
                  <div class="f-left thirty-five xpadding-left">
                      
                      <div class="f-left "><img src="<?php echo $theme_url; ?>/images/download-black.png"/></div>
                      <div class="f-right ninety">
                       <span class="bold-font ">Download Video</span><br /><br />
                        <a href="#">High Resolution (84.5 MB)</a><br />
                        <a href="#">Low Resolution (84.5 MB)</a>
                      </div>
                  </div>
                  <div class="c"></div>
              </div>
          </div>
          
          <div class="video-description">
              <span class="grey-text bold-font"> Programs: </span>
              <?php 
                  /*
                  foreach($field_video_programs as $key=>$row) {
                      print "<a href=#>".implode(",", (array) $row)."</a>";
                      if (count($row) != $key) print ", ";
                  }
                  */
                  foreach ($obj->field_video_program as $programs) {
                    $links[] = l($programs->value()->name, 'taxonomy/term/'. $programs->value()->tid);
                  }
                  print implode(', ', $links);

              ?>
              <br />
              <span class="grey-text bold-font"> Theme: </span>
              <?php 
                  $links = array();

                  // This stopped working for some reason. Need to investigate.
                  // foreach ($field_video_tags AS $term) {
                  //   $links[] = l($term['taxonomy_term']->name, 'taxonomy/term/'. $term['tid']);
                  // }

                  foreach ($obj->field_video_tags as $tags) {
                    $links[] = l($tags->value()->name, 'taxonomy/term/'. $tags->value()->tid);
                  }
                  print implode(', ', $links) .'<br />';

                 
              ?>
          </div>

          <div class="video-description border-top-solid">

              <span class="orange-text larger-font"> Supporting Documents </span>


              <div class="f-length xpadding-top">
                  <?php 
                  foreach($field_video_supporting_documents as $key=>$row) { ?>
                    
                    <ul class="vertical left padding-left">
                        <li><img src="<?php echo $theme_url; ?>/images/pdf_icon.png"/></li>
                        <li class="remove-side-border">
                          <?php echo ( "<a href=".file_create_url($row['uri']).">".sanitize_title(preg_replace("/\\.[^.\\s]{3,4}$/", "", $row['filename'])). ' ( '.formatSizeUnits($row['filesize']).' )'."</a>");
                          ?>
                        </li>

                        
                    </ul> 

                  <?php  } ?>   
              </div>

              
                    
                 <!-- print_r($field_video_supporting_documents); -->
             
          </div>

          <div class="video-description border-top-solid">

              <span class="orange-text larger-font"> Comments </span>

              <?php print render($content['comments']); ?>

             
          </div>
          

           <?php print render($content['links']); ?>

            
      </div>

           
            <?php 
                hide($content['field_presentation']);
                hide($content['field_forum_date']);
                hide($content['comments']);
                hide($content['links']);
                //print render($content);
            ?>
           
         

           

     </div>
    <!-- entry end -->



  

</div><!-- /.node -->
