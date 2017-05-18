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
// ddl($variables);
?>
<?php $theme_url = variable_get('theme_url', ''); ?>

<style type="text/css">
.page-banner {
    padding-bottom: 0px;
    margin-bottom: 0px;
}
</style>


<div class="container dark-grey-bg">
<div class="page-banner mck-wrap">
    <h2>Where can you go at McKinsey?</h2>
    <p>Opportunities are everywhere!</p>
    </div>
<div class="clearfix"></div>
<div class="locations">
<ul> 
    <li><a class="mck-button-locations" href="global-ops"  id="global-opportunities">View all (<?php print $variables['view']->go_all; ?>)</a></li>
<li><a class="mck-button-locations" href="/global-ops/asia" id="asia">Asia (<?php print $variables['view']->go_asia; ?>)</a></li>
<li><a class="mck-button-locations" href="/global-ops/latam"  id="latam">LatAm (<?php print $variables['view']->go_latam; ?>)</a></li>
<li><a class="mck-button-locations" href="/global-ops/na"  id="north-america">North America (<?php print $variables['view']->go_na; ?>)</a></li>
<li><a class="mck-button-locations" href="/global-ops/europe"  id="europe">Europe (<?php print $variables['view']->go_eu; ?>)</a></li>
<li><a class="mck-button-locations" href="/global-ops/africa"  id="africa">Africa (<?php print $variables['view']->go_af; ?>)</a></li>
<ul>
</div>
<div class="clearfix"></div>
</div>

<div class="mck-table mck-table--advanced" data-mck-table-advanced>
  <table>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
<thead>
      <tr>
        <td>
          Office/Locations <i class="mck-icon"></i>
        </td>
        <td data-mck-table-sort="false">
          <label for="input-table-title" class="mck-icon__search"></label>
          <input data-mck-table-search id="input-table-title" class="mck-table__search-input" type="text" placeholder="Role (search)" data-mck-table-focus />
        </td>
          
             <td data-mck-table-sort="false">
          <label for="input-table-title" class="mck-icon__search"></label>
          <input data-mck-table-search id="input-table-title" class="mck-table__search-input" type="text" placeholder="Sector (search)" data-mck-table-focus />
        </td>
          
        <td>
          Needs/Requirements <i class="mck-icon"></i>
        </td>

        <td>
          Needs/Requirements Exert <i class="mck-icon"></i>
        </td>
          
        <td data-mck-table-sort="false">Contact(s)</td>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rows as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php foreach ($row as $field => $content): ?>
        <td>
          <?php  

            // if($field == "field_contact_editable"){
            //   print $content;
            // } else {
              print $content;
            // }
          ?>
            </td>
          
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
</div>