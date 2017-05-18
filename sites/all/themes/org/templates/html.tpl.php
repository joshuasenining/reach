<?php
/**
 * @file
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation. $language->dir
 *   contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $jump_link_target: The HTML ID of the element that the "skip link" should
 *   link to. Defaults to "main-menu".
 * - $jump_link_text: The text for the "skip link". Defaults to "Jump to
 *   Navigation".
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It should be placed within the <body> tag. When selecting through CSS
 *   it's recommended that you use the body tag, e.g., "body.front". It can be
 *   manipulated through the variable $classes_array from preprocess functions.
 *   The default values can contain one or more of the following:
 *   - front: Page is the home page.
 *   - not-front: Page is not the home page.
 *   - logged-in: The current viewer is logged in.
 *   - not-logged-in: The current viewer is not logged in.
 *   - node-type-[node type]: When viewing a single node, the type of that node.
 *     For example, if the node is a Blog entry, this would be "node-type-blog".
 *     Note that the machine name of the content type will often be in a short
 *     form of the human readable label.
 *   The following only apply with the default sidebar_first and sidebar_second
 *   block regions:
 *     - two-sidebars: When both sidebars have content.
 *     - no-sidebars: When no sidebar content exists.
 *     - one-sidebar and sidebar-first or sidebar-second: A combination of the
 *       two classes when only one of the two sidebars have content.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see zen_preprocess_html()
 * @see template_process()
 */
 $theme_url = variable_get('theme_url', '');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"
  <?php print $rdf_namespaces; ?>>

  <head profile="<?php print $grddl_profile; ?>">
    <?php print $head; ?>
    <title><?php print $head_title; ?></title>
    <?php print $styles; ?>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="https://apps.mckinsey.com/t30/sites/all/themes/whymck/favicon.ico">
    
    <!-- Stylesheets -->
    <link href="<?php echo $theme_url; ?>/css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo $theme_url; ?>/css/non-responsive.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="<?php echo $theme_url; ?>/css/style.css" rel="stylesheet">
    <!-- <link href='http://fonts.googleapis.com/css?family=Rambla|Open+Sans:400,700|Open+Sans+Condensed:300' rel='stylesheet' type='text/css'> -->
    <link href='http://fonts.googleapis.com/css?family=Droid+Sans|Lato:300,400|PT+Sans|Open+Sans:400,300|Oswald|Roboto+Condensed|Oxygen:400,300' rel='stylesheet' type='text/css'>
    
    <?php print $scripts; ?>
    <script type="text/javascript">jwplayer.key="ITXX0J9yBFhtBBRqfkbur3pTJpBGsdyvkXQro0ZGTwg=";</script>
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->



  </head>

  <body class="landing-page <?php print $classes; ?>" <?php print $attributes;?>>

    <?php if ($jump_link_text && $jump_link_target): ?>
      <div id="skip-link">
        <a href="#<?php print $jump_link_target; ?>" class="element-invisible element-focusable"><?php print $jump_link_text; ?></a>
      </div>
    <?php endif; ?>

    <?php print $page_top; ?>
    <?php print $page; ?>
    <?php print $page_bottom; ?>





  <!-- container end -->

    <!-- Core JS libraries to bake the cake. -->
    <script src="<?php echo $theme_url; ?>/js/jquery-1.10.2.min.js"></script>
    <script src="<?php echo $theme_url; ?>/js/bootstrap.min.js"></script>
    <script src="<?php echo $theme_url; ?>/js/misc.js"></script>

    <script type="text/javascript">
    /*
        $(document).ready(function() {
            createDropDown();
            
            $(".dropdown dt a").click(function() {
                $(".dropdown dd ul").toggle();
            });

            $(document).bind('click', function(e) {
                var $clicked = $(e.target);
                if (! $clicked.parents().hasClass("dropdown"))
                    $(".dropdown dd ul").hide();
            });
                        
            $(".dropdown dd ul li a").click(function() {
                var text = $(this).html();
                $(".dropdown dt a").html(text);
                $(".dropdown dd ul").hide();
                
                var source = $("#source");
                source.val($(this).find("span.value").html())
            });
        });
        
        function createDropDown(){
            var source = $("#source");
            var selected = source.find("option[selected]");
            var options = $("option", source);
            
            $("li#first").append('<dl id="target" class="dropdown"></dl>')
            $("#target").append('<dt><a href="#">' + selected.text() + 
                '<span class="value">' + selected.val() + 
                '</span></a></dt>')
            $("#target").append('<dd><ul></ul></dd>')

            options.each(function(){
                $("#target dd ul").append('<li><a href="#">' + 
                    $(this).text() + '<span class="value">' + 
                    $(this).val() + '</span></a></li>');
            });
        }*/
    </script>

  </body>

</html>
