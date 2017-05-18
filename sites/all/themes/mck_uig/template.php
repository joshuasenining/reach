<?php
/**
 * @file
 * Process theme data.
 *
 * IMPORTANT WARNING: DO NOT MODIFY THIS FILE OR ANY OF THE INCLUDED FILES.
 */
global $theme_key, $path_to_at_core;
$theme_key = $GLOBALS['theme_key'];
$path_to_at_core = drupal_get_path('theme', 'mck_uig');

include_once($path_to_at_core . '/inc/helper.inc');
include_once($path_to_at_core . '/inc/alter.inc');      // all the hook_alter functions
include_once($path_to_at_core . '/inc/preprocess.inc'); // all preprocess functions
include_once($path_to_at_core . '/inc/process.inc');    // all process functions
include_once($path_to_at_core . '/inc/theme.inc');      // theme function overrides
include_once($path_to_at_core . '/inc/forms.inc');      // theme_form  and other form theme elements including module forms eg: webform
