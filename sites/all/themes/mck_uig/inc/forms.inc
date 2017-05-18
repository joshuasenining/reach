<?php
/**
 * @file
 */


/* 
 * theme_form  
 */
function mck_uig_form($variables) {
  $element = $variables['element'];
  $element['#attributes']['class'][] = 'mck-forms';
  
  if (isset($element['#action'])) {
    $element['#attributes']['action'] = drupal_strip_dangerous_protocols($element['#action']);
  }
  element_set_attributes($element, array('method', 'id'));
  if (empty($element['#attributes']['accept-charset'])) {
    $element['#attributes']['accept-charset'] = "UTF-8";
  }
  // Anonymous DIV to satisfy XHTML compliance.
  return '<form' . drupal_attributes($element['#attributes']) . '>' . $element['#children'] . '</form>';
}


/* 
 * theme_form_element_label  
 */
function mck_uig_form_element_label($variables) {
  $element = $variables['element'];
  // This is also used in the installer, pre-database setup.
  $t = get_t();

  // If title and required marker are both empty, output no label.
  if ((!isset($element['#title']) || $element['#title'] === '') && empty($element['#required'])) {
    return '';
  }

  // If the element is required, a required marker is appended to the label.
  //$required = !empty($element ['#required']) ? theme('form_required_marker', array('element' => $element)) : '';
  $required = '';

  $title = filter_xss_admin($element['#title']) . ":";

  $attributes['class'][] = 'mck-forms__label';
  // Style the label as class option to display inline with the element.
  if ($element ['#title_display'] == 'after') {
    $attributes['class'][] = 'option';
  }
  // Show label only to screen readers to avoid disruption in visual flows.
  elseif ($element ['#title_display'] == 'invisible') {
    $attributes['class'][] = 'element-invisible';
  }
  
  // if required
  if($element['#required']) {
    $attributes['class'][] = 'mck-forms__label--required';
  }
  if (!empty($element ['#id'])) {
    $attributes['for'] = $element['#id'];
  }

  // The leading whitespace helps visually separate fields from inline labels.
  return ' <label' . drupal_attributes($attributes) . '>' . $t('!title !required', array('!title' => $title, '!required' => $required)) . "</label>\n";
}


/* 
 * theme_form_element  
 */
function mck_uig_form_element($variables) {
  $element = &$variables ['element'];

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element ['#markup']) && !empty($element ['#id'])) {
    $attributes ['id'] = $element ['#id'];
  }
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('mck-forms__item');
  if (!empty($element ['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element ['#type'], '_', '-');
  }
  if (!empty($element ['#name'])) {
    $attributes ['class'][] = 'form-item-' . strtr($element ['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element ['#attributes']['disabled'])) {
    $attributes ['class'][] = 'form-disabled';
  }
  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element ['#title'])) {
    $element['#title_display'] = 'none';
  }
  $prefix = isset($element ['#field_prefix']) ? '<span class="field-prefix">' . $element ['#field_prefix'] . '</span> ' : '';
  $suffix = isset($element ['#field_suffix']) ? ' <span class="field-suffix">' . $element ['#field_suffix'] . '</span>' : '';

  switch ($element ['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      $output .= ' ' . $prefix . $element['#children'] . $suffix;
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  if (!empty($element ['#description'])) {
    $output .= '<div class="description">' . $element ['#description'] . "</div>\n";
  }
  
  $output .= "</div>\n";

  return $output;
}


/**
 * Implements theme_webform_element().
 * theme_webform_element
 */
function mck_uig_webform_element($variables) {
  $output = mck_uig_form_element($variables);
  return $output;
}

/**
 * theme_textfield
 */
function mck_uig_textfield($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'text';
  element_set_attributes($element, array('id', 'name', 'value', 'size', 'maxlength'));
  _form_set_class($element, array('form-text', 'mck-input-text'));

  $extra = '';
  if ($element['#autocomplete_path'] && drupal_valid_path($element['#autocomplete_path'])) {
    drupal_add_library('system', 'drupal.autocomplete');
    $element['#attributes']['class'][] = 'form-autocomplete';

    $attributes = array();
    $attributes['type'] = 'hidden';
    $attributes['id'] = $element['#attributes']['id'] . '-autocomplete';
    $attributes['value'] = url($element['#autocomplete_path'], array('absolute' => TRUE));
    $attributes['disabled'] = 'disabled';
    $attributes['class'][] = 'autocomplete';
    $extra = '<input' . drupal_attributes($attributes) . ' />';
  }

  $output = '<input' . drupal_attributes($element['#attributes']) . ' />';

  return $output . $extra;
}

/**
 * theme_textarea
 */
function mck_uig_textarea($variables) {
  $element = $variables ['element'];
  element_set_attributes($element, array('id', 'name', 'cols', 'rows'));
  _form_set_class($element, array('form-textarea', 'mck-input-paragraph'));

  $wrapper_attributes = array(
    'class' => array('form-textarea-wrapper'),
  );

  // Add resizable behavior.
  if (!empty($element ['#resizable'])) {
    drupal_add_library('system', 'drupal.textarea');
    $wrapper_attributes ['class'][] = 'resizable';
  }

  $output = '<div' . drupal_attributes($wrapper_attributes) . '>';
  $output .= '<textarea' . drupal_attributes($element ['#attributes']) . '>' . check_plain($element['#value']) . '</textarea>';
  $output .= '</div>';
  return $output;
}

/**
 * theme_select
 */
function mck_uig_select($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'size'));
  _form_set_class($element, array('form-select'));
 
  if(!isset($element['#attributes']['multiple'])){
    _form_set_class($element, array('mck-select-dropdown-select'));
  }
  return '<select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select>';
}


/**
 * theme_radio
 */
function mck_uig_radio($variables) {
  $element = $variables ['element'];
  $element ['#attributes']['type'] = 'radio';
  element_set_attributes($element, array('id', 'name', '#return_value' => 'value'));

  if (isset($element ['#return_value']) && $element ['#value'] !== FALSE && $element ['#value'] == $element ['#return_value']) {
    $element ['#attributes']['checked'] = 'checked';
  }
  _form_set_class($element, array('form-radio', 'mck-radio'));

  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}


/**
 * theme_password
 */
function mck_uig_password($variables) {
  $element = $variables ['element'];
  $element ['#attributes']['type'] = 'password';
  element_set_attributes($element, array('id', 'name', 'size', 'maxlength'));
  _form_set_class($element, array('form-text', 'mck-input-text'));

  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}

/**
 * theme_image_button
 */
function mck_uig_image_button($variables) {
  $element = $variables ['element'];
  $element ['#attributes']['type'] = 'image';
  element_set_attributes($element, array('id', 'name', 'value'));

  $element ['#attributes']['src'] = file_create_url($element ['#src']);
  if (!empty($element ['#title'])) {
    $element ['#attributes']['alt'] = $element ['#title'];
    $element ['#attributes']['title'] = $element ['#title'];
  }

  $element ['#attributes']['class'][] = 'form-' . $element ['#button_type'];
  if (!empty($element ['#attributes']['disabled'])) {
    $element ['#attributes']['class'][] = 'form-button-disabled';
  }
  $element ['#attributes']['class'][] = 'mck-button';
  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}

/**
 * theme_button
 */
function mck_uig_button($variables) {
  $element = $variables ['element'];
  $element ['#attributes']['type'] = 'submit';
  element_set_attributes($element, array('id', 'name', 'value'));

  $element ['#attributes']['class'][] = 'form-' . $element ['#button_type'];
  if (!empty($element ['#attributes']['disabled'])) {
    $element ['#attributes']['class'][] = 'form-button-disabled';
  }
  $element ['#attributes']['class'][] = 'mck-button';
  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}


/**
 * theme_file
 */
function mck_uig_file($variables) {
  $element = $variables ['element'];
  $element ['#attributes']['type'] = 'file';
  element_set_attributes($element, array('id', 'name', 'size'));
  _form_set_class($element, array('form-file', 'mck-uploader__input'));

  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}

/**
 * theme_checkbox
 */
function mck_uig_checkbox($variables) {
  $element = $variables['element'];
  $element ['#attributes']['type'] = 'checkbox';
  element_set_attributes($element, array('id', 'name', '#return_value' => 'value'));

  // Unchecked checkbox has #value of integer 0.
  if (!empty($element ['#checked'])) {
    $element ['#attributes']['checked'] = 'checked';
  }
  _form_set_class($element, array('form-checkbox', 'mck-checkbox'));

  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}


/**
 * theme_submit
 */
function mck_uig_submit($variables) {
  return theme('button', $variables['element']);
}


/**
 * theme_fieldset
 */
function mck_uig_fieldset($variables) {
  $element = $variables ['element'];
  element_set_attributes($element, array('id'));
  _form_set_class($element, array('form-wrapper', 'mck-form-fieldset'));

  $output = '<div' . drupal_attributes($element['#attributes']) . '>';
  if (!empty($element ['#title'])) {
    // Always wrap fieldset legends in a SPAN for CSS positioning.
    $output .= '<div class="mck-form-fieldset__header"><h4 class="fieldset-legend">' . $element['#title'] . '</h4></div>';
  }
  $output .= '<div class="fieldset-wrapper mck-form-fieldset__body">';
  if (!empty($element ['#description'])) {
    $output .= '<div class="fieldset-description">' . $element ['#description'] . '</div>';
  }
  $output .= $element['#children'];
  if (isset($element ['#value'])) {
    $output .= $element ['#value'];
  }
  $output .= '</div>';
  $output .= "</div>\n";
  return $output;
}


/**
 * Theme function to render an email component.
 * theme_webform_email
 */
function mck_uig_webform_email($variables) {
  $element = $variables['element'];

  // This IF statement is mostly in place to allow our tests to set type="text"
  // because SimpleTest does not support type="email".
  if (!isset($element['#attributes']['type'])) {
    $element['#attributes']['type'] = 'email';
  }

  // Convert properties to attributes on the element if set.
  foreach (array('id', 'name', 'value', 'size') as $property) {
    if (isset($element['#' . $property]) && $element['#' . $property] !== '') {
      $element['#attributes'][$property] = $element['#' . $property];
    }
  }
  _form_set_class($element, array('form-text', 'form-email', 'mck-input-text'));

  return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

