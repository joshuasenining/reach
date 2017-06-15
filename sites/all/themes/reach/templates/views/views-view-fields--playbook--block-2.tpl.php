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
$tname = str_replace(" ","_",strtolower($term->name));
$tname = preg_replace('/[^A-Za-z0-9\-]/', '', $tname);
$doclink =isset($row->field_field_document[0]['raw']['uri']) ?  $row->field_field_document[0]['raw']['uri']: NULL;
$doclinkurl = file_create_url($doclink);
$fileext = preg_replace('/^[^.]*.\s*/', '', $doclink);

if($parent){
    foreach($parent as $parent){
        $pname = $parent->name;
        $pname = str_replace(" ","_",strtolower($pname));
        $pname = preg_replace('/[^A-Za-z0-9\-]/', '', $pname);
    }
}


?>
    <div class="col xl3 l4 m6 s6">
        <div class="card" data-equalizer-watch="things">
            <div class="card-image">
                <?php print $fields['field_image']->content; ?>

            </div>
            <div class="card-content">
                <small><?php print $term->name; ?></small>
                <a href="node/<?php print $fields['nid']->raw;?>"><h5><?php print $fields['title']->raw; ?></h5></a>
                <p><?php print $fields['body']->content; ?></p>
            </div>
             <?php if (!empty($doclink)): ?>
                <div class="card-action">
                  <a href="<?php print $doclinkurl;?>" class="valign-wrapper"><span class="mck-icon__download"></span> <?php print $fileext ;?></a>
              </div>
              <?php endif; ?>
        </div>
    </div><!-- rr-->
