  <?php
  $theme_url = variable_get('theme_url', '');
  $base_url  = variable_get('base_url', '');
?>


    <nav class="nav-extended">
        <div class="nav-wrapper">
            <a href="<?php echo $base_url; ?>" class="brand-logo"><img src="<?php print $logo; ?>"></a>
            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

            <ul class="side-nav" id="mobile-demo">
                 <?php
                      print theme('links__system_main_menu', array(
                        'links' => $main_menu,
                        'attributes' => array(
                          'class' => array('navbar', 'clearfix'),
                        )
                      )); ?>


            </ul>
        </div>
        <div class="nav-content">

            <ul class="menutabs" id="nav-mobile">

                 <?php if ($main_menu): ?>
                  <nav class="main-menu" role="navigation">
                    <?php
                    print theme('links__system_main_menu', array(
                      'links' => $main_menu,
                      'attributes' => array(
                        'class' => array('navbar'),
                      ),
                      'heading' => array(
                        'text' => t(''),
                        'level' => 'span',
                        'class' => array('portaltitle','pull-left'),
                      ),
                    )); ?>
                  </nav>
              <?php endif; ?>
    </ul>
        </div>
    </nav>
   
  <?php if (!empty($page['header'])): ?>
    <div class="top">
      <?php print render($page['header']); ?>
    </div>
  <?php endif; ?><!-- /.header  -->

Test
<p>Your R&amp;R journey starts with a strategy. This section provides you with guidance and tools to develop a well thought-out, impact-driven Reach and Relevance plan, focused on client development priorities: what do you want to achieve? Who are your priority audiences? How are you going to engage with these audiences? What types of channels and activities will you use? What knowledge, content, capabilities do you need to build? These are the foundations of a successful R&amp;R plan.</p>
<p>Before you engage in this process, you need to assess your current R&amp;R performance, impact and capabilities. There are two tools currently to help with this process: K2R (Knowledge to Relevance metrics) and the annual R&amp;R EPR (self-assessment). They will help inform your thinking about the R&amp;R opportunities and priorities.</p>
<p>So, what does a great R&amp;R strategy look like? Take a look at the <a href="./sites/all/themes/reach/files/R&amp;R-strategies_Key-frameworks-for-your-plan.pptx">R&amp;R strategy guide</a> to find helpful frameworks as you get started, and follow these 7 important steps to develop your office / practice R&amp;R plan:</p>
<!--<p><img alt="" src="http://dev-drupaldev-lx07.amdc.mckinsey.com/media-services/reach/sites/default/files/chart-best.png" class="materialboxed" /></p>-->
<div class="center-align">
	<img alt="" height="950" src="sites/all/themes/reach/images/chart2.png" usemap="#chart2" width="950" /><map name="chart2"><area alt="review the cell strategic priorities" class="firstsection flowchart" coords="105,182,248,175,293,321,311,303,326,290,344,277,360,267,379,257,407,247,428,243,441,241,453,239,459,238,546,114,450,3,421,4,398,7,376,11,348,17,323,25,292,38,262,51,220,75,188,97,160,121,139,141" href="#" shape="poly" /> <area alt="segement your audience" class="secondsection flowchart" coords="474,3,569,111,484,237,501,237,508,239,524,242,542,246,561,252,575,259,590,266,603,274,618,284,628,293,640,303,650,315,703,311,801,304,825,163,801,135,775,113,753,94,735,81,704,62,670,45,638,32,605,20,568,13,532,7" href="#" shape="poly" /> <area alt="set your rr goals" class="thirdsection flowchart" coords="666,333,677,348,686,365,696,386,703,406,708,429,714,455,713,473,712,491,711,505,711,513,812,625,939,555,942,537,944,517,946,499,945,481,945,461,945,442,942,421,940,403,935,378,931,360,924,334,915,308,908,290,897,265,886,245,875,224,860,203,852,192,843,182,818,326" href="#" shape="poly" /> <area alt="define the space you want to own, the themes you want to be known for and your client value proposition" class="fourthsection flowchart" coords="705,538,700,554,694,568,687,583,681,595,674,606,663,622,656,632,644,643,634,652,626,659,615,668,604,675,597,680,592,682,567,832,702,889,719,878,734,870,748,860,761,851,775,840,786,831,799,818,812,806,826,791,839,776,853,759,862,745,873,729,883,711,892,696,901,679,907,666,916,644,922,623,927,609,932,593,932,582,806,649" href="#" shape="poly" /> <area alt="define the right mix of rr channels and activities" class="fifthsection flowchart" coords="385,698,397,701,409,704,422,707,434,710,453,713,466,714,480,714,492,713,499,712,513,711,524,709,536,707,547,702,559,698,569,694,546,843,677,900,668,906,658,911,647,915,632,921,617,925,601,930,582,934,565,938,550,940,532,942,516,944,502,945,490,946,476,946,463,946,437,945,413,942,393,939,369,934,345,929,320,921,302,915,291,909,253,769" href="#" shape="poly" /> <area alt="identify the key initiatives you need to take to  build your rr engine, and a detailed work plan, across all areas" class="sixthsection flowchart" coords="247,542,251,557,256,568,261,579,267,589,274,601,282,613,292,627,300,635,309,644,320,655,333,665,344,673,356,681,367,686,233,761,272,904,254,895,241,888,229,881,217,872,205,865,190,854,175,842,163,831,148,818,136,806,122,791,104,771,96,760,90,753,83,742,65,714,58,702,47,681,40,664,33,647,26,628,21,611,18,603,106,485" href="#" shape="poly" /> <area alt="identify how you will measure success" class="seventhsection flowchart" coords="89,199,81,211,75,221,66,235,58,248,52,260,46,272,41,285,35,297,30,310,25,324,22,337,17,351,14,364,10,379,7,394,5,411,3,427,1,443,1,454,2,467,2,482,1,494,2,503,3,520,6,538,7,550,9,565,12,575,14,582,100,465,243,523,240,512,239,498,238,482,238,466,239,456,241,439,244,424,246,412,251,396,258,381,263,369,269,356,274,348,281,339,237,192" href="#" shape="poly" />
	<div class="chart-container">
		<div class="firstsection-content shadow hide hover-content">
			<b>1.&nbsp;</b><strong>Review the cell strategic priorities.</strong> Are you clear on how you are positioned, the opportunities before you, and your client development priorities? You probably already have these well-defined, and you need to define how you want R&amp;R to help you achieve your goals.</div>
		<div class="secondsection-content shadow hide hover-content">
			<b>2.&nbsp;</b><strong>Segment your audience.</strong> Given your priorities, what communities and individuals do you need to connect with? Here you will define your priority clients, and the companies and executives you want to build relationships with. And, critically, you’ll determine what specifically you want to achieve with each segment through your R&amp;R efforts.</div>
		<div class="thirdsection-content shadow hide hover-content">
			<b>3.&nbsp;</b><strong>Set your R&amp;R goals. </strong>For each segment, synthesize your priorities into a clear set of aspirations for what you would like your R&amp;R to achieve. In some cases or new areas, the need is often to build awareness of our capabilities and services; in highly competitive areas, the R&amp;R effort will rather seek to build preference and strengthen our relationships, or to drive consideration for working with us.</div>
		<div class="fourthsection-content shadow hide hover-content">
			<b>4.&nbsp;</b><strong>Define the space you want to own, the themes you want to be known for and your client value proposition. </strong>For each target segment, you’ll need to define the messages and content you want to disseminate. This will be the foundation for your R&amp;R plan and communication. Since you can't effectively be "known for" everything you are capable of, you’ll want to identify the core themes that are most relevant to your target audiences, and were you can build a differentiated positioning.</div>
		<div class="fifthsection-content shadow hide hover-content">
			<b>5.&nbsp;</b><strong>Define the right mix of R&amp;R channels and activities</strong> that will help engage your key audiences. Think multi-channel! Beyond publishing—emails, events, conferences, and in-person interactions are highly valued by clientele.&nbsp;</div>
		<div class="sixthsection-content shadow hide hover-content">
			<b>6.&nbsp;</b><strong>Identify the key initiatives and capabilities you need to make it happen.</strong> This includes a detailed work plan, budget and resource requirement, and you’ll need to get approval and funding from your leadership.</div>
		<div class="seventhsection-content shadow hide hover-content">
			<b>7.&nbsp;</b><strong>Identify how you will measure success.</strong> It is important to understand what metrics will help you assess that you have reached your goals.</div>
	</div>
	</map></div>
<p>&nbsp;</p>

  <div class="row page">
    
    <section class="main" role="main">
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted"><?php print render($page['highlight']); ?></div>
      <?php endif; ?>

      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>


      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
     
      <?php print render($tabs_secondary); ?>

      <?php print render($page['content']); ?>
      <?php if (!empty($page['graysectioncontent'])): ?>
          
      <div class="section lightgraybk">
          <div class="container">

               <?php print render($page['graysectioncontent']); ?>
          </div>
      </div>
      <?php endif; ?>
      <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="col xl4 l4 m4 s12 sidebar-last" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>
 


    </section>
</div>
<?php global $base_url; ?>
<div class="row">
    

   <?php if (!empty($action_links)): ?>
        <div class="action-links"><i class="mdi-action-note-add small"></i><?php print render($action_links); ?></div>
      <?php endif; ?>
    <?php if (!empty($tabs['#primary'])): ?>
          <?php print render($tabs_primary); ?>
      <?php endif; ?>

</div>
    <div class="divider"></div>
      <footer class="page-footer">

          <div class="footer-copyright">
              <div class="container">
                
                  <span class="brand-logo"><img src="<?php print $base_url; ?>/sites/all/themes/reach/images/logo-main-fff.svg"></span>

                  <?php
                  $footer_menu = menu_navigation_links('menu-footer-menu');
                  print theme('links__menu_menu_footer_menu', array(
                      'links' => $footer_menu,
                      'attributes' => array(
                          'id' => 'footer-links',
                          'class' => array('blue-text'),
                      ),
                  ));
                   ?>
              </div>
          </div>
      </footer>
