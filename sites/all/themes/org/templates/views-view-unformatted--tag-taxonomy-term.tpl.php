<?php 
  $group_nr = 1;                  // first group number
  $last_row = count($rows) -1;    // last row
  $wrapper  = 4;                  // put a wrapper around every 2 rows
  ?>
  <?php
    //print '<div class="col-xs-4 record-'.$group_nr.'">'. 
    //      '<div class="content-record boxy" style="display: block;">';
  // <div class="row entry up">


  //               <div class="col-xs-12 list-view">
                  
  //                 <div class="f-length">

  ?>
<?php //if (!empty($title)): ?>
  <?php //print $title; ?>
<?php //endif; ?>

  <?php foreach ($rows as $id => $row):

      //print '<div class="row entry up">';
  ?>

          <?php print '<div class="col-xs-12 list-view no-l-pad">';

                print '<div class="f-length">'; ?>

                    <?php print $row; ?>

                <?php print '</div>'; ?>

          <?php print '</div>'; ?>
      
  <?php print '<div class="c"></div> '; ?>
<?php endforeach; ?>