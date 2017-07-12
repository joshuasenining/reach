<?php
/**
 * @file
 * reach_pathauto_configs.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function reach_pathauto_configs_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
