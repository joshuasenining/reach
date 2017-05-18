<?php

/**
 * @file
 * All Process functions for templates and theme fucntions.
 */

/**
 * Process variables for html.tpl.php
 */
function mck_uig_process_html(&$vars) {
  $vars['html_attributes'] = empty($vars['html_attributes_array']) ? '' : drupal_attributes($vars['html_attributes_array']);
  $vars['rdf_namespaces'] = empty($vars['rdf_namespaces_array']) ? '' : drupal_attributes($vars['rdf_namespaces_array']);
}

/**
 * Process variables for the html tag
 */
function mck_uig_process_html_tag(&$vars) {
  
}

/**
 * Process variables for page.tpl.php
 */
function mck_uig_process_page(&$vars) {
  
}

/**
 * Process variables for region.tpl.php
 */
function mck_uig_process_region(&$vars) {
  
}

/**
 * Process variables for block.tpl.php
 */
function mck_uig_process_block(&$vars) {
  
}

/**
 * Process variables for node.tpl.php
 */
function mck_uig_process_node(&$vars) {
  
}

/**
 * Process variables for comment.tpl.php
 */
function mck_uig_process_comment(&$vars) {
  
}

/**
 * Process variables for adaptivtheme_menubar()
 */
function mck_uig_process_menubar(&$vars) {
  
}

/**
 * Process variables for maintenance-page.tpl.php
 */
function mck_uig_process_maintenance_page(&$vars) {
  
}

/**
 * Process variables for user-profile.tpl.php
 */
function mck_uig_process_user_profile(&$vars) {
  
}
