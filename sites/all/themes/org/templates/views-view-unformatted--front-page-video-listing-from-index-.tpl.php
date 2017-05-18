<?php 
  $group_nr = 1;                  // first group number
  $last_row = count($rows) -1;    // last row
  $wrapper  = 4;                  // put a wrapper around every 2 rows
  ?>
  <?php
    //print '<div class="col-xs-4 record-'.$group_nr.'">'. 
    //      '<div class="content-record boxy" style="display: block;">';
  ?>
  <?php foreach ($rows as $id => $row): ?>
  <?php if ($id % $wrapper == 0) 
    {
      print '<div class="row entry up">';
          $i = 0; $group_nr++; 
    } ?>
          <?php print '<div class="col-xs-3">'; ?>
          <?php print $row; ?>
          <?php print '</div>'; ?>
      
  <?php $i++; if ($i == $wrapper || $id == $last_row) print '<div class="c"></div> </div>'; ?>
<?php endforeach; ?>