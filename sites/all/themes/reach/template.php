<?php

function reach_preprocess_page(&$variables){


    if (isset($variables['node']->type)) {
        // If the content type's machine name is "my_machine_name" the file
        // name will be "page--my-machine-name.tpl.php".

        if($variables['node']->type == "page"){
            $variables['theme_hook_suggestions'][] = 'page__type__' . "basic_page";
            drupal_add_js(drupal_get_path('theme','reach') . "/js/jquery.fancybox.min.js");
            drupal_add_css(drupal_get_path('theme','reach') . "/css/jquery.fancybox.min.css");

        } else {
            $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
        }

    }

    drupal_add_css(drupal_get_path('theme','reach') . "/css/iziModal.css");

    drupal_add_js(drupal_get_path('theme','reach') . "/js/isotope.pkgd.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/foundation.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/scrollreveal.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/owl.carousel.min.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/materialize.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/iziModal.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/jquery.rwdImageMaps.min.js");
//    drupal_add_js(drupal_get_path('theme','reach') . "/js/jquery-migrate-1.2.1.js");
    drupal_add_js(drupal_get_path('theme','reach') . "/js/main.js");



}

function sanitizename($name){
    $tname = str_replace(" ","_",strtolower($name));
    $tname = preg_replace('/[^A-Za-z0-9\-]/', '', $tname);
    return $tname;
}

function build_filter_sidebar(){
    $vocab = taxonomy_vocabulary_machine_name_load('inspired_stories_category');
    $vid = $vocab->vid;

    $tree = taxonomy_get_tree($vid);
    print '<div class="col xl3 l3 m4 s6 sidebar">';
    print '<div class="blue">';
    print '<button class="resetfilters">See All</button>';
    print '<small class="text-uppercase">filter by:</small>';
    print '<div class="button-group" id="sidebarfilters">';
    print '<ul class="collapsible" data-collapsible="accordion">';
    foreach($tree as $key=>$term) {

        $parent = sanitizename($term->name);

        if($term->parents[0]==0) {

            print '<li>';
            print '<div class="collapsible-header sidebarfilter-button" role="button" data-filter=".'.$parent.'" data-layout-mode="fitRows">
<span class="mck-icon__plus-circle"></span><p style="display:inline;">'.$term->name.'</p></div>';


            $childrens = taxonomy_get_children($term->tid);

            print '<div class="collapsible-body"><ul>';




            foreach($childrens as $children) {
                $child = sanitizename($children->name);

                print '<li><div class="child sidebarfilter-button" role="button" data-filter=".'.$child.'" data-layout-mode="fitRows">'.$children->name.'</div></li>';

            }

            Print '</ul></div>';
        }

    };

    print '</ul>';
    print '</div>';
    print '</div>';
    print '</div>';

}

function reach_preprocess_field(&$variables){
//  ddl($variables);
}


