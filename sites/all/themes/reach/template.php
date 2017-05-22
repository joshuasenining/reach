<?php

function reach_preprocess_page($vars){

    drupal_add_js(drupal_get_path('theme','reach') . "/js/isotope.pkgd.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/foundation.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/scrollreveal.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/main.js");

}

function build_filter_sidebar(){
    $vocab = taxonomy_vocabulary_machine_name_load('inspired_category');
    $vid = $vocab->vid;

    $tree = taxonomy_get_tree($vid);
    print '<ul>';
    foreach($tree as $key=>$term) {

        if($term->parents[0]==0) {
            print '<li>';
            print $term->name;

            $childrens = taxonomy_get_children($term->tid);
            print '<ul>';

            foreach($childrens as $children) {

                print $children->name;
            }
            print '</ul>';
            Print '</li>';
        }

    };

    print '</ul>';
}