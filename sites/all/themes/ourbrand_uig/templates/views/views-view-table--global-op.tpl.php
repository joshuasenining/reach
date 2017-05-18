<?php

/**
 * @file
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $caption: The caption for this table. May be empty.
 * - $header_classes: An array of header classes keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $classes: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * - $field_classes: An array of classes to apply to each field, indexed by
 *   field id, then row number. This matches the index in $rows.
 * @ingroup views_templates
 */

// dpm($rows);
?>
<div class="mck-table mck-table--advanced" data-mck-table-advanced>
<table role="grid" <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr class="row">
        <?php $count = 0; ?>
        <?php foreach ($header as $field => $label): ?>

        <?php if($field != "field_role_exert" && $field != "field_needs_requirements_exert") { ?>
          <td data-column="<?php print $count; ?>" tabindex="0" scope="col" role="columnheader" <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?>>
            <?php print $label; ?>
            <?php if($field == "field_office") { ?><i class="mck-icon mck-icon__carrot-stack"></i><?php } ?>
          </td>
        <?php } 
          $count++;
        ?>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rows as $row_count => $row): ?>
    <?php
    $role_exert = $row['field_role_exert'];
    $needs_exert = $row['field_needs_requirements'];
    $contact = $row['field_contact'];
    ?>
      <tr <?php if(!empty($role_exert)) print "data-mck-table-accordion"; ?> role="row" <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php foreach ($row as $field => $content): ?>
        <?php if($field != "field_role_exert" && $field != "field_needs_requirements_exert") { ?>
          <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php if(!empty($role_exert) && $field == "field_office") {?> <a href="#" class="mck-icon__plus mck-icon--dark" data-mck-table-toggle=""></a> <?php } ?>
            <?php if($field == "field_contact") {?> <span style="color:#0080f0" class="mck-icon__email"></span> <?php } ?>
            <?php print $content; ?>
          </td>
          <?php } ?>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
</div>