<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
//kpr($fields);

$tid = $fields['field_category']->content;
$term = taxonomy_term_load($tid); 
$parent = taxonomy_get_parents($tid);
//$tname = str_replace(" ","_",strtolower($term->name));
$tname = str_replace(" ","_",strtolower(isset($term->name) ? $term->name : NULL));
$tname = preg_replace('/[^A-Za-z0-9\-]/', '', $tname);

if($parent){
    foreach($parent as $parent){
        $pname = $parent->name;
        $pname = str_replace(" ","_",strtolower($pname));
        $pname = preg_replace('/[^A-Za-z0-9\-]/', '', $pname);
    }
}


?>
    <div class="col xl4 l6 m6 s6 element-item <?php print isset($pname) ? $pname : NULL; print " ".$tname;?>" id="<?php print $tname;?>" data-category="<?php print isset($pname) ? $pname : $tname; ?>">
        <div class="card" data-equalizer-watch="getinspired">
            <div class="card-image">
                <?php print $fields['field_image']->content; ?>

            </div>
            <div class="card-content">
                <small><?php print isset($term->name) ? $term->name : NULL;?></small>
                <a href=<?php global $base_path; print $base_path . drupal_get_path_alias("node/".$fields['nid']->raw);?>><h5><?php print $fields['title']->raw; ?></h5></a>
                <p><?php print $fields['field_content']->content; ?></p>
            </div>
        </div>
    </div><!-- rr-->
