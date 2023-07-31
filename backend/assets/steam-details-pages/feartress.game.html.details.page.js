const steamApp = {
	appid: 1904280,
	name: "Feartress",
};

export const feartressGameHtmlDetailsPage = `<!DOCTYPE html>
<html class=" responsive" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
			<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta name="theme-color" content="#171a21">
		<title>Feartress on Steam</title>
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">



	<link href="https://store.cloudflare.steamstatic.com/public/shared/css/motiva_sans.css?v=2C1Oh9QFVTyK&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/shared_global.css?v=H-W-Gf2q1RFS&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/buttons.css?v=hFJKQ6HV7IKT&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/css/v6/store.css?v=48r4uRz0Om0f&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/user_reviews.css?v=Q6gcHdIbWoqH&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/store_game_shared.css?v=3762vFgJovj_&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/css/v6/game.css?v=lh-aFIVcp5zX&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/css/v6/recommended.css?v=xuPF2BB4ygA-&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/css/v6/user_reviews_rewards.css?v=5-HJZa1v4wFP&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/apphub.css?v=dq0k-__8MsAY&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/ui-lightness/jquery-ui-1.7.2.custom.css?v=.23LkAmA0IgZV&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/css/v6/game_mob.css?v=kEXBA9CQlpVT&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/shared/css/shared_responsive.css?v=aS7NpS15vb98&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/jquery-1.8.3.min.js?v=.TZ2NKhB-nliU&amp;_cdn=cloudflare" ></script>
<script type="text/javascript">$J = jQuery.noConflict();</script><script type="text/javascript">VALVE_PUBLIC_PATH = "https:\/\/store.cloudflare.steamstatic.com\/public\/";</script><script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/tooltip.js?v=.zYHOpI1L3Rt0&amp;_cdn=cloudflare" ></script>

<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/shared_global.js?v=mxGcIHJbsRBB&amp;l=english&amp;_cdn=cloudflare" ></script>

<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/main.js?v=8QzdhbgQoSCe&amp;l=english&amp;_cdn=cloudflare" ></script>

<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/dynamicstore.js?v=XChGjlvYHGmJ&amp;l=english&amp;_cdn=cloudflare" ></script>

<script type="text/javascript">Object.seal && [ Object, Array, String, Number ].map( function( builtin ) { Object.seal( builtin.prototype ); } );</script>
		<script type="text/javascript">
			document.addEventListener('DOMContentLoaded', function(event) {
				$J.data( document, 'x_readytime', new Date().getTime() );
				$J.data( document, 'x_oldref', GetNavCookie() );
				SetupTooltips( { tooltipCSSClass: 'store_tooltip'} );
		});
		</script><script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/gamehighlightplayer.js?v=crWo2TbSQQMt&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/user_reviews.js?v=hevgpisYIGMf&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/dselect.js?v=sjouo3-33Gox&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/app_tagging.js?v=igMrG-xV0WEr&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/game.js?v=DtB6k8B6DQAt&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/flot-0.8/jquery.flot.min.js?v=.-m414tR-pxn_&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/flot-0.8/jquery.flot.resize.min.js?v=.4PeWDSmdkiqV&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/flot-0.8/jquery.flot.time.min.js?v=.tcjKevZLo5Un&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/flot-0.8/jquery.flot.selection.min.js?v=._7pxnS3SCqO7&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/jquery-ui-1.9.2.js?v=.4YjdpcHj68MM&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/shared/javascript/shared_responsive_adapter.js?v=6jtqzASUCYZw&amp;l=english&amp;_cdn=cloudflare" ></script>

						<meta name="twitter:card" content="summary_large_image">
					<meta name="Description" content="Feartress is an incremental fantasy RPG where you gather resources, build structures and hire workers and armies to help you succeed in battle and expand your territory.">

	<meta name="twitter:site" content="@steam" />

						<meta property="og:title" content="Feartress on Steam">
					<meta property="twitter:title" content="Feartress on Steam">
					<meta property="og:type" content="website">
					<meta property="fb:app_id" content="105386699540688">
					<meta property="og:site" content="Steam">
					<meta property="og:url" content="https://store.steampowered.com/app/1904280/Feartress/">
					<meta property="og:description" content="Feartress is an incremental fantasy RPG where you gather resources, build structures and hire workers and armies to help you succeed in battle and expand your territory.">
					<meta property="twitter:description" content="Feartress is an incremental fantasy RPG where you gather resources, build structures and hire workers and armies to help you succeed in battle and expand your territory.">

			<link rel="canonical" href="https://store.steampowered.com/app/1904280/Feartress/">

			<link rel="image_src" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/capsule_616x353.jpg?t=1651712653">
		<meta property="og:image" content="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/capsule_616x353.jpg?t=1651712653">
		<meta name="twitter:image" content="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/capsule_616x353.jpg?t=1651712653" />





	</head>
<body class="v6 app game_bg application responsive_page">


<div class="responsive_page_frame with_header">
						<div class="responsive_page_menu_ctn mainmenu">
				<div class="responsive_page_menu"  id="responsive_page_menu">
										<div class="mainmenu_contents">
						<div class="mainmenu_contents_items">
															<a class="menuitem" href="https://store.steampowered.com/login/?redir=app%2F1904280%2FFeartress%2F&redir_ssl=1&snr=1_5_9__global-header">
									Login								</a>
								<a class="menuitem supernav" href="https://store.steampowered.com/?snr=1_5_9__global-responsive-menu" data-tooltip-type="selector" data-tooltip-content=".submenu_store">
		Store	</a>
	<div class="submenu_store" style="display: none;" data-submenuid="store">
		<a class="submenuitem" href="https://store.steampowered.com/?snr=1_5_9__global-responsive-menu">Home</a>
					<a class="submenuitem" href="https://store.steampowered.com/explore/?snr=1_5_9__global-responsive-menu">Discovery Queue</a>
				<a class="submenuitem" href="https://steamcommunity.com/my/wishlist/">Wishlist</a>
		<a class="submenuitem" href="https://store.steampowered.com/points/shop/?snr=1_5_9__global-responsive-menu">Points Shop</a>
       	<a class="submenuitem" href="https://store.steampowered.com/news/?snr=1_5_9__global-responsive-menu">News</a>
					<a class="submenuitem" href="https://store.steampowered.com/stats/?snr=1_5_9__global-responsive-menu">Stats</a>
					</div>


			<a class="menuitem supernav" style="display: block" href="https://steamcommunity.com/" data-tooltip-type="selector" data-tooltip-content=".submenu_community">
			Community		</a>
		<div class="submenu_community" style="display: none;" data-submenuid="community">
			<a class="submenuitem" href="https://steamcommunity.com/">Home</a>
			<a class="submenuitem" href="https://steamcommunity.com/discussions/">Discussions</a>
			<a class="submenuitem" href="https://steamcommunity.com/workshop/">Workshop</a>
			<a class="submenuitem" href="https://steamcommunity.com/market/">Market</a>
			<a class="submenuitem" href="https://steamcommunity.com/?subsection=broadcasts">Broadcasts</a>
											</div>




	<a class="menuitem" href="https://help.steampowered.com/en/">
		Support	</a>

							<div class="minor_menu_items">
																								<div class="menuitem change_language_action">
									Change language								</div>
																																	<div class="menuitem" onclick="Responsive_RequestDesktopView();">
										View desktop website									</div>
															</div>
						</div>
						<div class="mainmenu_footer_spacer  "></div>
						<div class="mainmenu_footer">
															<div class="mainmenu_footer_logo"><img src="https://store.cloudflare.steamstatic.com/public/shared/images/responsive/logo_valve_footer.png"></div>
								© Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.								<span class="mainmenu_valve_links">
									<a href="https://store.steampowered.com/privacy_agreement/?snr=1_5_9__global-responsive-menu" target="_blank">Privacy Policy</a>
									&nbsp;| &nbsp;<a href="http://www.valvesoftware.com/legal.htm" target="_blank">Legal</a>
									&nbsp;| &nbsp;<a href="https://store.steampowered.com/subscriber_agreement/?snr=1_5_9__global-responsive-menu" target="_blank">Steam Subscriber Agreement</a>
									&nbsp;| &nbsp;<a href="https://store.steampowered.com/steam_refunds/?snr=1_5_9__global-responsive-menu" target="_blank">Refunds</a>
								</span>
													</div>
					</div>
									</div>
			</div>

		<div class="responsive_local_menu_tab"></div>

		<div class="responsive_page_menu_ctn localmenu">
			<div class="responsive_page_menu"  id="responsive_page_local_menu" data-panel="{&quot;onOptionsActionDescription&quot;:&quot;Filter&quot;,&quot;onOptionsButton&quot;:&quot;Responsive_ToggleLocalMenu()&quot;,&quot;onCancelButton&quot;:&quot;Responsive_ToggleLocalMenu()&quot;}">
				<div class="localmenu_content" data-panel="{&quot;maintainY&quot;:true,&quot;bFocusRingRoot&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}">
				</div>
			</div>
		</div>



					<div class="responsive_header">
				<div class="responsive_header_content">
					<div id="responsive_menu_logo">
						<img src="https://store.cloudflare.steamstatic.com/public/shared/images/responsive/header_menu_hamburger.png" height="100%">
											</div>
					<div class="responsive_header_logo">
						<a href="https://store.steampowered.com/?snr=1_5_9__global-responsive-menu">
															<img src="https://store.cloudflare.steamstatic.com/public/shared/images/responsive/header_logo.png" height="36" border="0" alt="STEAM">
													</a>
					</div>
				</div>
			</div>

		<div class="responsive_page_content_overlay">

		</div>

		<div class="responsive_fixonscroll_ctn nonresponsive_hidden ">
		</div>

	<div class="responsive_page_content">

		<div id="global_header" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}">
	<div class="content">
		<div class="logo">
			<span id="logo_holder">
									<a href="https://store.steampowered.com/?snr=1_5_9__global-header">
						<img src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" width="176" height="44">
					</a>
							</span>
		</div>

			<div class="supernav_container">
	<a class="menuitem supernav" href="https://store.steampowered.com/?snr=1_5_9__global-header" data-tooltip-type="selector" data-tooltip-content=".submenu_store">
		STORE	</a>
	<div class="submenu_store" style="display: none;" data-submenuid="store">
		<a class="submenuitem" href="https://store.steampowered.com/?snr=1_5_9__global-header">Home</a>
					<a class="submenuitem" href="https://store.steampowered.com/explore/?snr=1_5_9__global-header">Discovery Queue</a>
				<a class="submenuitem" href="https://steamcommunity.com/my/wishlist/">Wishlist</a>
		<a class="submenuitem" href="https://store.steampowered.com/points/shop/?snr=1_5_9__global-header">Points Shop</a>
       	<a class="submenuitem" href="https://store.steampowered.com/news/?snr=1_5_9__global-header">News</a>
					<a class="submenuitem" href="https://store.steampowered.com/stats/?snr=1_5_9__global-header">Stats</a>
					</div>


			<a class="menuitem supernav" style="display: block" href="https://steamcommunity.com/" data-tooltip-type="selector" data-tooltip-content=".submenu_community">
			COMMUNITY		</a>
		<div class="submenu_community" style="display: none;" data-submenuid="community">
			<a class="submenuitem" href="https://steamcommunity.com/">Home</a>
			<a class="submenuitem" href="https://steamcommunity.com/discussions/">Discussions</a>
			<a class="submenuitem" href="https://steamcommunity.com/workshop/">Workshop</a>
			<a class="submenuitem" href="https://steamcommunity.com/market/">Market</a>
			<a class="submenuitem" href="https://steamcommunity.com/?subsection=broadcasts">Broadcasts</a>
											</div>



						<a class="menuitem" href="https://store.steampowered.com/about/?snr=1_5_9__global-header">
				ABOUT			</a>

	<a class="menuitem" href="https://help.steampowered.com/en/">
		SUPPORT	</a>
	</div>
	<script type="text/javascript">
		jQuery(function($) {
			$('#global_header .supernav').v_tooltip({'location':'bottom', 'destroyWhenDone': false, 'tooltipClass': 'supernav_content', 'offsetY':-4, 'offsetX': 1, 'horizontalSnap': 4, 'tooltipParent': '#global_header .supernav_container', 'correctForScreenSize': false});
		});
	</script>

		<div id="global_actions">
			<div id="global_action_menu">
									<div class="header_installsteam_btn header_installsteam_btn_green">

						<a class="header_installsteam_btn_content" href="https://store.steampowered.com/about/?snr=1_5_9__global-header">
							Install Steam						</a>
					</div>


														<a class="global_action_link" href="https://store.steampowered.com/login/?redir=app%2F1904280%2FFeartress%2F&redir_ssl=1&snr=1_5_9__global-header">login</a>
											&nbsp;|&nbsp;
						<span class="pulldown global_action_link" id="language_pulldown" onclick="ShowMenu( this, 'language_dropdown', 'right' );">language</span>
						<div class="popup_block_new" id="language_dropdown" style="display: none;">
							<div class="popup_body popup_menu">
																																					<a class="popup_menu_item tight" href="?l=schinese" onclick="ChangeLanguage( 'schinese' ); return false;">简体中文 (Simplified Chinese)</a>
																													<a class="popup_menu_item tight" href="?l=tchinese" onclick="ChangeLanguage( 'tchinese' ); return false;">繁體中文 (Traditional Chinese)</a>
																													<a class="popup_menu_item tight" href="?l=japanese" onclick="ChangeLanguage( 'japanese' ); return false;">日本語 (Japanese)</a>
																													<a class="popup_menu_item tight" href="?l=koreana" onclick="ChangeLanguage( 'koreana' ); return false;">한국어 (Korean)</a>
																													<a class="popup_menu_item tight" href="?l=thai" onclick="ChangeLanguage( 'thai' ); return false;">ไทย (Thai)</a>
																													<a class="popup_menu_item tight" href="?l=bulgarian" onclick="ChangeLanguage( 'bulgarian' ); return false;">Български (Bulgarian)</a>
																													<a class="popup_menu_item tight" href="?l=czech" onclick="ChangeLanguage( 'czech' ); return false;">Čeština (Czech)</a>
																													<a class="popup_menu_item tight" href="?l=danish" onclick="ChangeLanguage( 'danish' ); return false;">Dansk (Danish)</a>
																													<a class="popup_menu_item tight" href="?l=german" onclick="ChangeLanguage( 'german' ); return false;">Deutsch (German)</a>
																																							<a class="popup_menu_item tight" href="?l=spanish" onclick="ChangeLanguage( 'spanish' ); return false;">Español - España (Spanish - Spain)</a>
																													<a class="popup_menu_item tight" href="?l=latam" onclick="ChangeLanguage( 'latam' ); return false;">Español - Latinoamérica (Spanish - Latin America)</a>
																													<a class="popup_menu_item tight" href="?l=greek" onclick="ChangeLanguage( 'greek' ); return false;">Ελληνικά (Greek)</a>
																													<a class="popup_menu_item tight" href="?l=french" onclick="ChangeLanguage( 'french' ); return false;">Français (French)</a>
																													<a class="popup_menu_item tight" href="?l=italian" onclick="ChangeLanguage( 'italian' ); return false;">Italiano (Italian)</a>
																													<a class="popup_menu_item tight" href="?l=hungarian" onclick="ChangeLanguage( 'hungarian' ); return false;">Magyar (Hungarian)</a>
																													<a class="popup_menu_item tight" href="?l=dutch" onclick="ChangeLanguage( 'dutch' ); return false;">Nederlands (Dutch)</a>
																													<a class="popup_menu_item tight" href="?l=norwegian" onclick="ChangeLanguage( 'norwegian' ); return false;">Norsk (Norwegian)</a>
																													<a class="popup_menu_item tight" href="?l=polish" onclick="ChangeLanguage( 'polish' ); return false;">Polski (Polish)</a>
																													<a class="popup_menu_item tight" href="?l=portuguese" onclick="ChangeLanguage( 'portuguese' ); return false;">Português (Portuguese)</a>
																													<a class="popup_menu_item tight" href="?l=brazilian" onclick="ChangeLanguage( 'brazilian' ); return false;">Português - Brasil (Portuguese - Brazil)</a>
																													<a class="popup_menu_item tight" href="?l=romanian" onclick="ChangeLanguage( 'romanian' ); return false;">Română (Romanian)</a>
																													<a class="popup_menu_item tight" href="?l=russian" onclick="ChangeLanguage( 'russian' ); return false;">Русский (Russian)</a>
																													<a class="popup_menu_item tight" href="?l=finnish" onclick="ChangeLanguage( 'finnish' ); return false;">Suomi (Finnish)</a>
																													<a class="popup_menu_item tight" href="?l=swedish" onclick="ChangeLanguage( 'swedish' ); return false;">Svenska (Swedish)</a>
																													<a class="popup_menu_item tight" href="?l=turkish" onclick="ChangeLanguage( 'turkish' ); return false;">Türkçe (Turkish)</a>
																													<a class="popup_menu_item tight" href="?l=vietnamese" onclick="ChangeLanguage( 'vietnamese' ); return false;">Tiếng Việt (Vietnamese)</a>
																													<a class="popup_menu_item tight" href="?l=ukrainian" onclick="ChangeLanguage( 'ukrainian' ); return false;">Українська (Ukrainian)</a>
																									<a class="popup_menu_item tight" href="http://translation.steampowered.com" target="_blank">Report a translation problem</a>
							</div>
						</div>
												</div>
					</div>
			</div>
</div>
<div id="responsive_store_nav_ctn"></div><div id="responsive_store_nav_overlay" style="display:none;"><div id="responsive_store_nav_overlay_ctn"></div><div id="responsive_store_nav_overlay_bottom"></div></div><div data-cart-banner-spot="1"></div>
		<div class="responsive_page_template_content" id="responsive_page_template_content" data-panel="{&quot;autoFocus&quot;:true}" >


<script type="text/javascript">

	var g_eDiscoveryQueueType = 0;

	GStoreItemData.AddStoreItemDataSet(
		{"rgApps":{"627690":{"name":"Idle Champions of the Forgotten Realms","url_name":"Idle_Champions_of_the_Forgotten_Realms","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"0\"><div class=\"discount_prices\"><div class=\"discount_final_price\">Free to Play<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/627690\/capsule_184x69.jpg?t=1651269104","os_windows":true,"os_macos":true,"has_live_broadcast":false,"localized":true},"329110":{"name":"Gems of War - Puzzle RPG","url_name":"Gems_of_War__Puzzle_RPG","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"0\"><div class=\"discount_prices\"><div class=\"discount_final_price\">Free to Play<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/329110\/capsule_184x69.jpg?t=1646790417","os_windows":true,"has_live_broadcast":false,"localized":true},"1267910":{"name":"Melvor Idle","url_name":"Melvor_Idle","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"819\"><div class=\"discount_prices\"><div class=\"discount_final_price\">8,19\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1267910\/capsule_184x69.jpg?t=1638262540","os_windows":true,"os_macos":true,"os_linux":true,"has_live_broadcast":false,"localized":true},"955900":{"name":"Amazing Cultivation Simulator","url_name":"Amazing_Cultivation_Simulator","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"2099\"><div class=\"discount_prices\"><div class=\"discount_final_price\">20,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/955900\/capsule_184x69.jpg?t=1643358522","os_windows":true,"has_live_broadcast":false,"localized":true},"1477950":{"name":"Lazy Galaxy 2","url_name":"Lazy_Galaxy_2","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"799\"><div class=\"discount_prices\"><div class=\"discount_final_price\">7,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1477950\/capsule_184x69.jpg?t=1649923216","os_windows":true,"os_macos":true,"os_linux":true,"has_live_broadcast":false,"localized":true},"679900":{"name":"Swords &amp; Souls: Neverseen","url_name":"Swords__Souls_Neverseen","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"1499\"><div class=\"discount_prices\"><div class=\"discount_final_price\">14,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/679900\/capsule_184x69.jpg?t=1633422543","os_windows":true,"os_macos":true,"has_live_broadcast":false,"localized":true},"867290":{"name":"Crossroads Inn Anniversary Edition","url_name":"Crossroads_Inn_Anniversary_Edition","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"2499\"><div class=\"discount_prices\"><div class=\"discount_final_price\">24,99\u20ac<\/div><\/div><\/div>","descids":[1,2,5],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/867290\/capsule_184x69.jpg?t=1650553380","os_windows":true,"has_live_broadcast":false,"localized":true,"has_adult_content_violence":true,"has_adult_content_sex":true},"610080":{"name":"Realm Grinder","url_name":"Realm_Grinder","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"0\"><div class=\"discount_prices\"><div class=\"discount_final_price\">Free to Play<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/610080\/capsule_184x69.jpg?t=1592248284","os_windows":true,"os_macos":true,"has_live_broadcast":false,"localized":true},"1160750":{"name":"Grim Clicker","url_name":"Grim_Clicker","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"0\"><div class=\"discount_prices\"><div class=\"discount_final_price\">Free To Play<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1160750\/capsule_184x69.jpg?t=1598313754","os_windows":true,"early_access":true,"has_live_broadcast":false,"localized":true},"1593350":{"name":"Increlution","url_name":"Increlution","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"239\"><div class=\"discount_prices\"><div class=\"discount_final_price\">2,39\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1593350\/capsule_184x69.jpg?t=1646312963","os_windows":true,"os_macos":true,"os_linux":true,"early_access":true,"has_live_broadcast":false,"localized":true},"946050":{"name":"Soda Dungeon 2","url_name":"Soda_Dungeon_2","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"0\"><div class=\"discount_prices\"><div class=\"discount_final_price\">Free To Play<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/946050\/capsule_184x69.jpg?t=1613492765","os_windows":true,"os_macos":true,"has_live_broadcast":false,"localized":true},"972010":{"name":"Raiders! Forsaken Earth","url_name":"Raiders_Forsaken_Earth","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"1679\"><div class=\"discount_prices\"><div class=\"discount_final_price\">16,79\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/972010\/capsule_184x69.jpg?t=1634575559","os_windows":true,"has_live_broadcast":false,"localized":true},"1806030":{"name":"Minimal Dungeon RPG","url_name":"Minimal_Dungeon_RPG","discount_block":"<div class=\"discount_block \" data-price-final=\"655\"><div class=\"discount_pct\">-20%<\/div><div class=\"discount_prices\"><div class=\"discount_original_price\">8,19\u20ac<\/div><div class=\"discount_final_price\">6,55\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1806030\/capsule_184x69.jpg?t=1646709904","os_windows":true,"os_macos":true,"has_live_broadcast":false,"discount":true,"localized":true},"1580520":{"name":"Lost Eidolons","url_name":"Lost_Eidolons","discount_block":"<div class=\"discount_block empty \"><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1580520\/capsule_184x69.jpg?t=1651561251","os_windows":true,"has_live_broadcast":false,"coming_soon":true,"localized":true},"224500":{"name":"Gnomoria","url_name":"Gnomoria","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"1499\"><div class=\"discount_prices\"><div class=\"discount_final_price\">14,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/224500\/capsule_184x69.jpg?t=1456262462","os_windows":true,"os_macos":true,"os_linux":true,"has_live_broadcast":false,"localized":true},"629910":{"name":"Clicker Heroes 2","url_name":"Clicker_Heroes_2","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"1679\"><div class=\"discount_prices\"><div class=\"discount_final_price\">16,79\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/629910\/capsule_184x69.jpg?t=1616612884","os_windows":true,"os_macos":true,"early_access":true,"has_live_broadcast":false,"localized":true},"1351500":{"name":"SimPocalypse","url_name":"SimPocalypse","discount_block":"<div class=\"discount_block \" data-price-final=\"491\"><div class=\"discount_pct\">-40%<\/div><div class=\"discount_prices\"><div class=\"discount_original_price\">8,19\u20ac<\/div><div class=\"discount_final_price\">4,91\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1351500\/capsule_184x69.jpg?t=1643532202","os_windows":true,"os_linux":true,"has_live_broadcast":false,"discount":true,"localized":true},"1610350":{"name":"Vanaris Tactics - Prologue","url_name":"Vanaris_Tactics__Prologue","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"0\"><div class=\"discount_prices\"><div class=\"discount_final_price\">Free<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1610350\/capsule_184x69.jpg?t=1650605719","os_windows":true,"has_live_broadcast":false,"localized":true},"1732800":{"name":"Cascade Tactics","url_name":"Cascade_Tactics","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"659\"><div class=\"discount_prices\"><div class=\"discount_final_price\">6,59\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1732800\/capsule_184x69.jpg?t=1645188689","os_windows":true,"os_linux":true,"early_access":true,"has_live_broadcast":false,"localized":true},"1433030":{"name":"MOAI 7: Mystery Coast","url_name":"MOAI_7_Mystery_Coast","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"739\"><div class=\"discount_prices\"><div class=\"discount_final_price\">7,39\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1433030\/capsule_184x69.jpg?t=1632748149","os_windows":true,"has_live_broadcast":false,"localized":true},"1304770":{"name":"The Magister","url_name":"The_Magister","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"1249\"><div class=\"discount_prices\"><div class=\"discount_final_price\">12,49\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1304770\/capsule_184x69.jpg?t=1641489071","os_windows":true,"has_live_broadcast":false,"localized":true},"1918520":{"name":"Ninja Village","url_name":"Ninja_Village","discount_block":"<div class=\"discount_block empty \"><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1918520\/capsule_184x69.jpg?t=1650853467","os_windows":true,"has_live_broadcast":false,"coming_soon":true,"localized":true},"1724010":{"name":"Need More Troops","url_name":"Need_More_Troops","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"399\"><div class=\"discount_prices\"><div class=\"discount_final_price\">3,99\u20ac<\/div><\/div><\/div>","descids":[2,5],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1724010\/capsule_184x69.jpg?t=1636222245","os_windows":true,"has_live_broadcast":false,"localized":true,"has_adult_content_violence":true},"1649730":{"name":"xiuzhen idle","url_name":"xiuzhen_idle","discount_block":"<div class=\"discount_block empty \"><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1649730\/capsule_184x69.jpg?t=1651406708","os_windows":true,"os_macos":true,"os_linux":true,"early_access":true,"has_live_broadcast":false,"coming_soon":true},"45200":{"name":"Defense of the Oasis","url_name":"Defense_of_the_Oasis","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"399\"><div class=\"discount_prices\"><div class=\"discount_final_price\">3,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/45200\/capsule_184x69.jpg?t=1598404866","os_windows":true,"has_live_broadcast":false,"localized":true},"502230":{"name":"Monsters' Den: Book of Dread","url_name":"Monsters_Den_Book_of_Dread","discount_block":"<div class=\"discount_block  no_discount\" data-price-final=\"499\"><div class=\"discount_prices\"><div class=\"discount_final_price\">4,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/502230\/capsule_184x69.jpg?t=1622261783","os_windows":true,"has_live_broadcast":false,"localized":true},"341150":{"name":"Age of Fear 2: The Chaos Lord GOLD","url_name":"Age_of_Fear_2_The_Chaos_Lord_GOLD","discount_block":"<div class=\"discount_block \" data-price-final=\"399\"><div class=\"discount_pct\">-80%<\/div><div class=\"discount_prices\"><div class=\"discount_original_price\">19,99\u20ac<\/div><div class=\"discount_final_price\">3,99\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/341150\/capsule_184x69.jpg?t=1641773625","os_windows":true,"os_macos":true,"os_linux":true,"has_live_broadcast":false,"discount":true,"localized":true},"838350":{"name":"\u592a\u543e\u7ed8\u5377 The Scroll Of Taiwu","url_name":"_The_Scroll_Of_Taiwu","discount_block":"<div class=\"discount_block \" data-price-final=\"1427\"><div class=\"discount_pct\">-15%<\/div><div class=\"discount_prices\"><div class=\"discount_original_price\">16,79\u20ac<\/div><div class=\"discount_final_price\">14,27\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/838350\/capsule_184x69.jpg?t=1599208942","os_windows":true,"early_access":true,"has_live_broadcast":false,"discount":true},"1681140":{"name":"Pagan Age","url_name":"Pagan_Age","discount_block":"<div class=\"discount_block empty \"><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1681140\/capsule_184x69.jpg?t=1651135307","os_windows":true,"has_live_broadcast":false,"coming_soon":true,"localized":true},"46410":{"name":"Avencast: Rise of the Mage","url_name":"Avencast_Rise_of_the_Mage","discount_block":"<div class=\"discount_block \" data-price-final=\"79\"><div class=\"discount_pct\">-80%<\/div><div class=\"discount_prices\"><div class=\"discount_original_price\">3,99\u20ac<\/div><div class=\"discount_final_price\">0,79\u20ac<\/div><\/div><\/div>","descids":[],"small_capsulev5":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/46410\/capsule_184x69.jpg?t=1634248442","os_windows":true,"has_live_broadcast":false,"discount":true,"localized":true}},"rgPackages":[],"rgBundles":[]}	);
	GStoreItemData.AddNavParams( {
		recommended: "1_5_9__300",
		recommend_franchise: "1_5_9__316",
		more_from_franchise: "1_5_9__317",
		bundle_component_preview: "1_5_9__412",
		recommended_ranked_played: "1_5_9__862",
	} );


	$J( function() {
		var $Expander = $J('#devnotes_expander');
		if( $Expander.length && $Expander.height() < parseInt( $Expander.css('max-height') ) ) {
			$J('#devnotes_more').hide();
		}

		CollapseLongStrings( '.dev_row .summary.column' );

				InitAutocollapse();
		InitHorizontalAutoSliders();

		Responsive_ReparentItemsInResponsiveMode( '.responsive_apppage_details_right', $J('#responsive_apppage_details_right_ctn') );
		Responsive_ReparentItemsInResponsiveMode( '.responsive_apppage_details_left', $J('#responsive_apppage_details_left_ctn') );
		Responsive_ReparentItemsInResponsiveMode( '.responsive_apppage_reviewblock', $J('#responsive_apppage_reviewblock_ctn') );

		//hack to workaround chrome bug
		$J('#responsive_apppage_reviewblock_ctn' ).css('width', '100%' );
		window.setTimeout( function() { $J('#responsive_apppage_reviewblock_ctn').css('width', '' ); }, 1 );


				var watcher = new CScrollOffsetWatcher( $J('#app_reviews_hash'), OnLoadReviews );
		watcher.SetBufferHeight( 0 );

				InitPlaytimeFilterSlider();

		// on Tablet wait to do this when the window is fully loaded - see OnPageLoaded()
				ReparentAppLandingPageForSmallScreens();


				AddRightNavStickyPaddingOnTablet();

			var usability = InitUsabilityTracker( "https:\/\/store.steampowered.com\/app\/usabilitytracking\/1904280" );
		usability.ScheduleUpload();

	} );
	GDynamicStore.OnReady( function() {
		RenderMoreLikeThisBlock( ["627690","329110","1267910","955900","1477950","679900","867290","610080","1160750","1593350","946050","972010","1806030","1580520","224500","629910","1351500","1610350","1732800","1433030","1304770","1918520","1724010","1649730","45200","502230","341150","838350","1681140","46410"], !!true );
		RenderFranchiseAppBlock( [] );
		RenderMoreDLCFromBaseGameBlock( [] );

	});


	function OpenTagModal()
	{
		ShowAppTagModal( 1904280 );
	}

</script>

<div class="game_page_background game" style="background-image: url('https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/page_bg_generated_v6b.jpg?t=1651712653');">



    	    <div id="store_header" class="">
		<div class="content">
			<div id="store_controls">
				<div id="cart_status_data">
																					<div class="store_header_btn_green store_header_btn" id="store_header_cart_btn" style="display: none;">
							<div class="store_header_btn_caps store_header_btn_leftcap"></div>
							<div class="store_header_btn_caps store_header_btn_rightcap"></div>
							<a id="cart_link" class="store_header_btn_content" href="https://store.steampowered.com/cart/?snr=1_5_9__12">
								Cart								(<span id="cart_item_count_value">0</span>)
							</a>
						</div>
									</div>
			</div>

												<div id="store_nav_area">
					<div class="store_nav_leftcap"></div>
					<div class="store_nav_bg">
						<div class="store_nav" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}" >


							<div class="tab  flyout_tab " id="foryou_tab"
								 data-flyout="foryou_flyout" data-flyout-align="left" data-flyout-valign="bottom" data-flyout-delay="300"
								data-panel="{&quot;focusable&quot;:true}" >
								<span class="pulldown">
									<a class="pulldown_desktop" href="https://store.steampowered.com/?snr=1_5_9__12">Your Store</a>
									<a class="pulldown_mobile" href="#">Your Store</a>
									<span></span>
								</span>
							</div>
							<div class="popup_block_new flyout_tab_flyout responsive_slidedown" id="foryou_flyout" style="display: none;">
								<div class="popup_body popup_menu popup_menu_browse">
									<a class="popup_menu_item" href="https://store.steampowered.com/?snr=1_5_9__12">
										Home									</a>
                                                                            <a class="popup_menu_item" href="https://store.steampowered.com/communityrecommendations/?snr=1_5_9__12">
                                            Community Recommendations                                        </a>
                                    									<a class="popup_menu_item" href="https://store.steampowered.com/recommended/?snr=1_5_9__12">
										Recently Viewed									</a>
                                                                            <a class="popup_menu_item" href="https://store.steampowered.com/curators/?snr=1_5_9__12">
                                            Steam Curators                                        </a>
                                    								</div>
							</div>

														<div class="store_labs_new"></div>
                            <div class="tab  flyout_tab " id="noteworthy_tab"
								 data-flyout="noteworthy_flyout" data-flyout-align="left" data-flyout-valign="bottom" data-flyout-delay="300" data-panel="{&quot;focusable&quot;:true}" >
								<span class="pulldown">
									<a href="javascript:void(0);" class="pulldown_desktop">New &amp; Noteworthy</a>
									<a href="javascript:void(0);" class="pulldown_mobile">New &amp; Noteworthy</a>
									<span></span>
								</span>
                            </div>
                            <div class="popup_block_new flyout_tab_flyout responsive_slidedown" id="noteworthy_flyout" style="display: none;">
                                <div class="popup_body popup_menu popup_menu_browse">
                                    <a class="popup_menu_item" href="https://store.steampowered.com/search/?filter=topsellers&snr=1_5_9__12">
                                        Top Sellers                                    </a>
                                    <a class="popup_menu_item" href="https://store.steampowered.com/explore/new/?snr=1_5_9__12">
										New & Trending                                    </a>
                                    <a class="popup_menu_item" href="https://store.steampowered.com/specials/?snr=1_5_9__12">
										Current Specials									</a>
									<a class="popup_menu_item" href="https://store.steampowered.com/newshub/?snr=1_5_9__12">
                                        Recently Updated                                    </a>
                                    <a class="popup_menu_item" href="https://store.steampowered.com/explore/upcoming/?snr=1_5_9__12">
                                        Popular Upcoming                                    </a>

									<!--
                                    <div class="popup_menu_subheader">Sale Events
									</div>

                                    <a class="popup_menu_item" href="https://store.steampowered.com/search/?specials=1&snr=1_5_9__12">
                                        Weekly Specials
                                    </a>
                                    <a class="popup_menu_item" href="https://store.steampowered.com/sale/vr_specials/?snr=1_5_9__12">
                                        Weekly VR Specials
                                    </a>
                                    -->
                                </div>
                            </div>

															<div class="tab  flyout_tab " id="genre_tab"
									 data-flyout="genre_flyout" data-flyout-align="left" data-flyout-valign="bottom" data-flyout-align-to-element="foryou_tab" data-flyout-delay="300"
									data-panel="{&quot;focusable&quot;:true}" >
									<span class="pulldown">
										<a class="pulldown_desktop" href="javascript:void(0);">Categories</a>
										<a class="pulldown_mobile" href="javascript:void(0);">Categories</a>
										<span></span>
									</span>
								</div>
								<div class="popup_block_new flyout_tab_flyout responsive_slidedown" id="genre_flyout" style="display: none;">
									<div class="popup_body popup_menu_twocol_new">
										<div class="popup_menu popup_menu_browse" data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}" >

										<div class="popup_menu_subheader responsive_hidden">Special Sections</div>
																																																																							<a class="popup_menu_item" href="https://store.steampowered.com/genre/Free%20to%20Play/?snr=1_5_9__12">
														Free to Play													</a>
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						<a class="popup_menu_item" href="https://store.steampowered.com/demos/?snr=1_5_9__12">
														<span>Demos</span>
													</a>
																										<a class="popup_menu_item" href="https://store.steampowered.com/genre/Early%20Access/?snr=1_5_9__12">
														Early Access													</a>


																							<a class="popup_menu_item" href="https://store.steampowered.com/controller/?snr=1_5_9__12">
													<span>Controller-Friendly</span>
												</a>

																						<a class="popup_menu_item" href="https://store.steampowered.com/remoteplay_hub/?snr=1_5_9__12">
												<span>Remote Play</span>
											</a>

                                            <a class="popup_menu_item" href="https://store.steampowered.com/software/?snr=1_5_9__12">
                                                Software											</a>

											<a class="popup_menu_item" href="https://store.steampowered.com/soundtracks?snr=1_5_9__12">
												Soundtracks											</a>

																							<a class="popup_menu_item" href="https://store.steampowered.com/vr/?snr=1_5_9__12">
													<span>VR Titles</span>
												</a>

												<a class="popup_menu_item" href="https://store.steampowered.com/vrhardware/?snr=1_5_9__12">
													<span>VR Hardware</span>
												</a>

												<a class="popup_menu_item" href="https://store.steampowered.com/steamdeck/?snr=1_5_9__category-menu">
													<span>Steam Deck</span>
												</a>

												<a class="popup_menu_item" href="https://store.steampowered.com/greatondeck/?snr=1_5_9__category-menu">
													<span>Great on Deck</span>
												</a>

												<a class="popup_menu_item" href="https://store.steampowered.com/macos?snr=1_5_9__12">
													macOS												</a>
												<a class="popup_menu_item" href="https://store.steampowered.com/linux?snr=1_5_9__12">
													SteamOS + Linux												</a>

												<a class="popup_menu_item" href="https://store.steampowered.com/pccafe/?snr=1_5_9__12">
													<span>For PC Cafés</span>
												</a>
																					</div>
																					<div class="popup_menu popup_menu_browse leftborder" data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}">
																								<div class="popup_menu_subheader reduced_vspace">
													Genres
												</div>
																																				<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="action">
														Action													</div>
																									<div class="popup_menu_subheader popup_genre_expand_header responsive_hidden" data-genre-group="action">
														<a class="popup_menu_item" href="https://store.steampowered.com/category/action/?snr=1_5_9__12">
															Action														</a>
													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="action">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/action_rogue_like/?snr=1_5_9__12">Action Rogue-Like</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/arcade_rhythm/?snr=1_5_9__12">Arcade & Rhythm</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/action_beat_em_up/?snr=1_5_9__12">Beat 'Em Up</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/fighting_martial_arts/?snr=1_5_9__12">Fighting & Martial Arts</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/action_fps/?snr=1_5_9__12">First-Person Shooter</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/action_run_jump/?snr=1_5_9__12">Platformer & Runner</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/action_tps/?snr=1_5_9__12">Third-Person Shooter</a>
																										</div>
																									<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="adventure_and_casual">
														Adventure & Casual													</div>
																									<div class="popup_menu_subheader popup_genre_expand_header responsive_hidden" data-genre-group="adventure_and_casual">
														<a class="popup_menu_item" href="https://store.steampowered.com/category/adventure_and_casual/?snr=1_5_9__12">
															Adventure & Casual														</a>
													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="adventure_and_casual">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/adventure/?snr=1_5_9__12">Adventure</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/adventure_rpg/?snr=1_5_9__12">Adventure RPG</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/casual/?snr=1_5_9__12">Casual</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/metroidvania/?snr=1_5_9__12">Metroidvania</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/puzzle_matching/?snr=1_5_9__12">Puzzle</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/story_rich/?snr=1_5_9__12">Story-Rich</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/visual_novel/?snr=1_5_9__12">Visual Novel</a>
																										</div>
												</div>											<div class="popup_menu popup_menu_browse " data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}">
																								<div class="popup_menu_subheader reduced_vspace responsive_hidden">
													<br>
												</div>
																																				<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="rpg">
														Role-Playing													</div>
																									<div class="popup_menu_subheader popup_genre_expand_header responsive_hidden" data-genre-group="rpg">
														<a class="popup_menu_item" href="https://store.steampowered.com/category/rpg/?snr=1_5_9__12">
															Role-Playing														</a>
													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="rpg">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/rpg_action/?snr=1_5_9__12">Action RPG</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/adventure_rpg/?snr=1_5_9__12">Adventure RPG</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/rpg_jrpg/?snr=1_5_9__12">JRPG</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/rpg_party_based/?snr=1_5_9__12">Party-Based</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/rogue_like_rogue_lite/?snr=1_5_9__12">Rogue-Like</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/rpg_strategy_tactics/?snr=1_5_9__12">Strategy RPG</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/rpg_turn_based/?snr=1_5_9__12">Turn-Based</a>
																										</div>
																									<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="simulation">
														Simulation													</div>
																									<div class="popup_menu_subheader popup_genre_expand_header responsive_hidden" data-genre-group="simulation">
														<a class="popup_menu_item" href="https://store.steampowered.com/category/simulation/?snr=1_5_9__12">
															Simulation														</a>
													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="simulation">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_building_automation/?snr=1_5_9__12">Building & Automation</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_dating/?snr=1_5_9__12">Dating</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_farming_crafting/?snr=1_5_9__12">Farming & Crafting</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_hobby_sim/?snr=1_5_9__12">Hobby & Job</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_life/?snr=1_5_9__12">Life & Immersive</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_physics_sandbox/?snr=1_5_9__12">Sandbox & Physics</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sim_space_flight/?snr=1_5_9__12">Space & Flight</a>
																										</div>
												</div>											<div class="popup_menu popup_menu_browse " data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}">
																								<div class="popup_menu_subheader reduced_vspace responsive_hidden">
													<br>
												</div>
																																				<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="strategy">
														Strategy													</div>
																									<div class="popup_menu_subheader popup_genre_expand_header responsive_hidden" data-genre-group="strategy">
														<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy/?snr=1_5_9__12">
															Strategy														</a>
													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="strategy">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy_card_board/?snr=1_5_9__12">Card & Board</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy_cities_settlements/?snr=1_5_9__12">City & Settlement</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy_grand_4x/?snr=1_5_9__12">Grand & 4X</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy_military/?snr=1_5_9__12">Military</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy_real_time/?snr=1_5_9__12">Real-Time Strategy</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/tower_defense/?snr=1_5_9__12">Tower Defense</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/strategy_turn_based/?snr=1_5_9__12">Turn-Based Strategy</a>
																										</div>
																									<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="sports_and_racing">
														Sports & Racing													</div>
																									<div class="popup_menu_subheader popup_genre_expand_header responsive_hidden" data-genre-group="sports_and_racing">
														<a class="popup_menu_item" href="https://store.steampowered.com/category/sports_and_racing/?snr=1_5_9__12">
															Sports & Racing														</a>
													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="sports_and_racing">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/sports/?snr=1_5_9__12">All Sports</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sports_fishing_hunting/?snr=1_5_9__12">Fishing & Hunting</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sports_individual/?snr=1_5_9__12">Individual Sports</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/racing/?snr=1_5_9__12">Racing</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/racing_sim/?snr=1_5_9__12">Racing Sim</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sports_sim/?snr=1_5_9__12">Sports Sim</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/sports_team/?snr=1_5_9__12">Team Sports</a>
																										</div>
												</div>											<div class="popup_menu popup_menu_browse leftborder" data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}">
																																				<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="themes">
														Themes													</div>
																									<div class="popup_menu_subheader players popup_genre_expand_header responsive_hidden" >
														Themes													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="themes">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/anime/?snr=1_5_9__12">Anime</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/going_rogue/?snr=1_5_9__12">Going Rogue</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/horror/?snr=1_5_9__12">Horror</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/mystery_detective/?snr=1_5_9__12">Mystery & Detective</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/exploration_open_world/?snr=1_5_9__12">Open World</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/science_fiction/?snr=1_5_9__12">Sci-Fi & Cyberpunk</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/space/?snr=1_5_9__12">Space</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/survival/?snr=1_5_9__12">Survival</a>
														 <div class="spacer responsive_hidden"></div> 												</div>
																									<div class="popup_menu_item popup_genre_expand_header nonresponsive_hidden" data-genre-group="social_and_players">
														Player Support													</div>
																									<div class="popup_menu_subheader players popup_genre_expand_header responsive_hidden" >
														Player Support													</div>
																								<div class="popup_genre_expand_content responsive_hidden" data-genre-group="social_and_players">
																											<a class="popup_menu_item" href="https://store.steampowered.com/category/multiplayer_coop/?snr=1_5_9__12">Co-Operative</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/multiplayer_lan/?snr=1_5_9__12">LAN</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/multiplayer_local_party/?snr=1_5_9__12">Local & Party</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/multiplayer_mmo/?snr=1_5_9__12">MMO</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/multiplayer/?snr=1_5_9__12">Multiplayer</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/multiplayer_online_competitive/?snr=1_5_9__12">Online Competitive</a>
																												<a class="popup_menu_item" href="https://store.steampowered.com/category/singleplayer/?snr=1_5_9__12">Singleplayer</a>
																										</div>
												</div>									</div>
								</div>

							                                                                <a class="tab  " href="https://store.steampowered.com/points/?snr=1_5_9__12">
                                    <span>Points Shop</span>
                                </a>

                                                        <a class="tab  " href="https://store.steampowered.com/news/?snr=1_5_9__12">
								<span>News</span>
							</a>

                                                                                            <a class="tab  " href="https://store.steampowered.com/labs/?snr=1_5_9__12">
                                    <span>Labs</span>
                                </a>

															<div class="search_flex_spacer"></div>
								<div class="search_area">
									<div id="store_search">
										<form id="searchform" name="searchform" method="get" action="https://store.steampowered.com/search/" onsubmit="return SearchSuggestCheckTerm(this);">
											<input type="hidden" name="snr" value="1_5_9__12" >
											<div class="searchbox">
												<input id="store_nav_search_term" name="term" type="text" class="default" placeholder="search" size="22" autocomplete="off" maxlength="64">
												<a href="#" id="store_search_link" onclick="var $Form = $J(this).parents('form'); $Form.submit(); return false;"><img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif"></a>
											</div>
										</form>
									</div>
									<div id="searchterm_options" class="search_suggest popup_block_new" style="display: none;">
										<div class="popup_body" style="border-top: none;">
											<div id="search_suggestion_contents">
											</div>
										</div>
									</div>
								</div>

						</div>
					</div>
					<div class="store_nav_rightcap"></div>
				</div>
							</div>
	</div>

				<script type="text/javascript">
			$J( function() {
				BindAutoFlyoutEvents();

				var $Window = $J(window);
				var $Header = $J('#store_header');
				var $ResponsiveNavWindowShadeCtn = $J('#responsive_store_nav_ctn');
				var $ResponsiveNavOverlay = $J('#responsive_store_nav_overlay');
				var $ResponsiveNavOverlayCtn = $J('#responsive_store_nav_overlay_ctn');
				var $ResponsiveNavOverlayBottom = $J('#responsive_store_nav_overlay_bottom');
				var $HeaderWrapper;
				$Window.on('Responsive_SmallScreenModeToggled.StoreMenu', function() {
					var bUseSmallScreenMode = window.UseSmallScreenMode && window.UseSmallScreenMode();

											if ( !$HeaderWrapper )
							$HeaderWrapper = $Header.wrap( $J('<div/>', {'class': 'responsive_store_nav_ctn_spacer'} ) ).parent();

						if ( bUseSmallScreenMode )
							$ResponsiveNavWindowShadeCtn.append( $Header );
						else
							$HeaderWrapper.append( $Header );


						if ( bUseSmallScreenMode )
						{
							$Header.css( 'visibility', 'hidden' );
							$Header.show();

							var nStartingScrollPosition = $J('#store_header').height();
							if ( $Window.scrollTop() < nStartingScrollPosition )
								$Window.scrollTop( nStartingScrollPosition );

							$Header.css('visibility', 'visible');
						}
									} );

				window.setTimeout( function() { $J(window).trigger('Responsive_SmallScreenModeToggled.StoreMenu'); }, 0 );

										var g_rgUserPreferences = {
							excluded_tags : [],
							excluded_content_descriptors : [3,4]						};
													g_rgUserPreferences['use_store_query'] = 1;

						if( $J('#searchform').length > 0 )
						{
							// default search support where the web page includes the search edit control
							EnableSearchSuggestions( $J('#searchform')[0].elements['term'], '1_5_9_', 'AT', 1, 'english', g_rgUserPreferences, '14717495' );
						}
						else
						{
							// search support for the mobile client.  the mobile client has a native search edit control but relies on the web content to perform the query and show results
													}

				// make genre categories expand/collapse on mobile
				$J(document).on( 'click', '.popup_genre_expand_header', function ( event ) {
					if ( !UseSmallScreenMode() )
						return;

					event.preventDefault();
					var $Element = $J(this);
					var $Target = $J('.popup_genre_expand_content[data-genre-group=' + $Element.data('genre-group') + ']' );
					if ( $Element.data('group-expanded') )
					{
						$Target.slideUp();
						$Element.data( 'group-expanded', false );
					}
					else
					{
						$Target.slideDown();
						$Element.data( 'group-expanded', true );
					}
				});
			} );
		</script>
	<script type="text/javascript">
	var g_AccountID = 0;
	var g_sessionID = "52dd57078cda962dd39d52ff";
	var g_ServerTime = 1651732693;

	$J( InitMiniprofileHovers );


			GStoreItemData.AddNavParams({
			__page_default: "1_5_9_",
			storemenu_recommendedtags: "1_5_9__17"		});
		GDynamicStore.Init( 0, false, "", {"primary_language":null,"secondary_languages":null,"platform_windows":null,"platform_mac":null,"platform_linux":null,"hide_adult_content_violence":null,"hide_adult_content_sex":null,"timestamp_updated":null,"hide_store_broadcast":null,"review_score_preference":null,"timestamp_content_descriptor_preferences_updated":null,"provide_deck_feedback":null}, 'AT',
			{"bNoDefaultDescriptors":false} );
		GStoreItemData.SetCurrencyFormatter( function( nValueInCents, bWholeUnitsOnly ) { var fnBase = function( nValueInCents, bWholeUnitsOnly ) { var fmt = function( nValueInCents, bWholeUnitsOnly ) {	var format = v_numberformat( nValueInCents / 100, bWholeUnitsOnly ? 0 : 2, ",", " "); return format; };var strNegativeSymbol = '';	if ( nValueInCents < 0 ) { strNegativeSymbol = '-'; nValueInCents = -nValueInCents; }return strNegativeSymbol + fmt( nValueInCents, bWholeUnitsOnly ) + "\u20ac";}; return fnBase( nValueInCents, bWholeUnitsOnly ).replace(  ',00', ',--' ); } );
		GStoreItemData.SetCurrencyMinPriceIncrement( 1 );
	</script>


	<div id="application_config" style="display: none;"  data-config="{&quot;EUNIVERSE&quot;:1,&quot;WEB_UNIVERSE&quot;:&quot;public&quot;,&quot;LANGUAGE&quot;:&quot;english&quot;,&quot;COUNTRY&quot;:&quot;AT&quot;,&quot;MEDIA_CDN_COMMUNITY_URL&quot;:&quot;https:\/\/cdn.cloudflare.steamstatic.com\/steamcommunity\/public\/&quot;,&quot;MEDIA_CDN_URL&quot;:&quot;https:\/\/cdn.cloudflare.steamstatic.com\/&quot;,&quot;COMMUNITY_CDN_URL&quot;:&quot;https:\/\/community.cloudflare.steamstatic.com\/&quot;,&quot;COMMUNITY_CDN_ASSET_URL&quot;:&quot;https:\/\/cdn.cloudflare.steamstatic.com\/steamcommunity\/public\/assets\/&quot;,&quot;STORE_CDN_URL&quot;:&quot;https:\/\/store.cloudflare.steamstatic.com\/&quot;,&quot;PUBLIC_SHARED_URL&quot;:&quot;https:\/\/store.cloudflare.steamstatic.com\/public\/shared\/&quot;,&quot;COMMUNITY_BASE_URL&quot;:&quot;https:\/\/steamcommunity.com\/&quot;,&quot;CHAT_BASE_URL&quot;:&quot;https:\/\/steamcommunity.com\/&quot;,&quot;STORE_BASE_URL&quot;:&quot;https:\/\/store.steampowered.com\/&quot;,&quot;IMG_URL&quot;:&quot;https:\/\/store.cloudflare.steamstatic.com\/public\/images\/&quot;,&quot;STEAMTV_BASE_URL&quot;:&quot;https:\/\/steam.tv\/&quot;,&quot;HELP_BASE_URL&quot;:&quot;https:\/\/help.steampowered.com\/&quot;,&quot;PARTNER_BASE_URL&quot;:&quot;https:\/\/partner.steamgames.com\/&quot;,&quot;STATS_BASE_URL&quot;:&quot;https:\/\/partner.steampowered.com\/&quot;,&quot;INTERNAL_STATS_BASE_URL&quot;:&quot;https:\/\/steamstats.valve.org\/&quot;,&quot;IN_CLIENT&quot;:false,&quot;USE_POPUPS&quot;:false,&quot;STORE_ICON_BASE_URL&quot;:&quot;https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/&quot;,&quot;WEBAPI_BASE_URL&quot;:&quot;https:\/\/api.steampowered.com\/&quot;,&quot;TOKEN_URL&quot;:&quot;https:\/\/store.steampowered.com\/\/chat\/clientjstoken&quot;,&quot;BUILD_TIMESTAMP&quot;:1651697337,&quot;PAGE_TIMESTAMP&quot;:1651732693,&quot;IN_TENFOOT&quot;:false,&quot;IN_GAMEPADUI&quot;:false,&quot;PLATFORM&quot;:&quot;macos&quot;,&quot;BASE_URL_STORE_CDN_ASSETS&quot;:&quot;https:\/\/cdn.cloudflare.steamstatic.com\/store\/&quot;,&quot;EREALM&quot;:1,&quot;LOGIN_BASE_URL&quot;:&quot;https:\/\/login.steampowered.com\/&quot;,&quot;AVATAR_BASE_URL&quot;:&quot;https:\/\/avatars.cloudflare.steamstatic.com\/&quot;,&quot;SNR&quot;:&quot;1_5_9_&quot;}" data-userinfo="{&quot;logged_in&quot;:false,&quot;country_code&quot;:&quot;AT&quot;}" data-broadcastuser="{&quot;success&quot;:1,&quot;bHideStoreBroadcast&quot;:false}"></div>

	<!-- create two column layout for Deck, Tablet sized screens -->
	<div id="tabletGrid" class="tablet_grid">

	<div class="page_content_ctn" itemscope itemtype="http://schema.org/Product">


		<meta itemprop="image" content="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/capsule_231x87.jpg?t=1651712653">

		<div class="page_title_area game_title_area page_content" data-gpnav="columns">
			<div class="breadcrumbs" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}" >
								<div class="blockbg">
											<a href="https://store.steampowered.com/search/?term=&snr=1_5_9__205">All Games</a>
																					&gt; <a href="https://store.steampowered.com/genre/Strategy/?snr=1_5_9__205">Strategy Games</a>
																				&gt; <a href="https://store.steampowered.com/app/1904280/?snr=1_5_9__205"><span itemprop="name">Feartress</span></a>

				</div>
				<div style="clear: left;"></div>
							</div>


<div class="apphub_HomeHeaderContent">

	<div class="apphub_HeaderStandardTop">
		                      <div class="apphub_OtherSiteInfo">


                <a class="btnv6_blue_hoverfade btn_medium" href="https://steamcommunity.com/app/1904280">
                    <span>Community Hub</span>
                </a>
            </div>
         		<div class="apphub_AppIcon"><img src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/1904280/03cd80460c86fe262e50549f6cccc3f76aae65d5.jpg"><div class="overlay"></div></div>
		<div id="appHubAppName" class="apphub_AppName">Feartress</div>
		<div style="clear: both"></div>

	</div>

</div>


								</div>
		<div style="clear: left;"></div>


		<div class="block">
						<script type="text/javascript">
				var strRequiredVersion = "9";
				if ( typeof( g_bIsOnMac ) != 'undefined' && g_bIsOnMac )
					strRequiredVersion = "10.1.0";

			</script>
			<div class="game_background_glow">

							<div data-panel="{&quot;autoFocus&quot;:true,&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="responsive_page_header_img" style="display: none;">
					<img style="width:100%;" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/header.jpg?t=1651712653">
				</div>

			<div class="block_content page_content" id="game_highlights" data-panel="{&quot;flow-children&quot;:&quot;column&quot;}" >

				<div class="rightcol" data-panel="{&quot;flow-children&quot;:&quot;column&quot;}" >
					<div class="glance_ctn">
						<div id="gameHeaderImageCtn" class="game_header_image_ctn">
							<img class="game_header_image_full" src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/header.jpg?t=1651712653">

																						<div id="appHubAppName_responsive" style="display: none;" class="apphub_AppName">Feartress</div>
								<div data-panel="{&quot;type&quot;:&quot;PanelGroup&quot;}" id="appHeaderGridContainer" class="app_header_grid_container" style="display:none">

																			<div class="grid_label">Developer</div>
										<div class="grid_content">
											<a href="https://store.steampowered.com/search/?developer=Frederik%20List&snr=1_5_9__400">Frederik List</a>, <a href="https://store.steampowered.com/search/?developer=Aaron%20Miles&snr=1_5_9__400">Aaron Miles</a>										</div>

																														<div class="grid_label">Publisher</div>
											<div class="grid_content">
												<a href="https://store.steampowered.com/search/?publisher=Foo%20Dogs%20Co.%2C%20Ltd.&snr=1_5_9__422">Foo Dogs Co., Ltd.</a>											</div>

																			<div class="grid_label grid_date">Release</div>
										<div class="grid_content grid_date">
											TBD										</div>
																	</div>


						</div>
													<div class="game_description_snippet">
								Feartress is an incremental fantasy RPG where you gather resources, build structures and hire workers and armies to help you succeed in battle and expand your territory.							</div>

						<div class="glance_ctn_responsive_left">
															<div id="userReviews" class="user_reviews">


																		<div class="user_reviews_summary_row" onclick="window.location='#app_reviews_hash'" style="cursor: pointer;" data-tooltip-html="No user reviews" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
										<div class="subtitle column all">All Reviews:</div>
										<div class="summary column">
																					No user reviews																				</div>
									</div>
								</div>

															<div class="release_date">
									<div class="subtitle column">Release Date:</div>
									<div class="date">TBD</div>
								</div>

																						<div class="dev_row">
									<div class="subtitle column">Developer:</div>
									<div class="summary column" id="developers_list">
										<a href="https://store.steampowered.com/search/?developer=Frederik%20List&snr=1_5_9__2000">Frederik List</a>, <a href="https://store.steampowered.com/search/?developer=Aaron%20Miles&snr=1_5_9__2000">Aaron Miles</a>									</div>
								</div>

																								<div class="dev_row">
										<div class="subtitle column">Publisher:</div>
										<div class="summary column">
										<a href="https://store.steampowered.com/search/?publisher=Foo%20Dogs%20Co.%2C%20Ltd.&snr=1_5_9__422">Foo Dogs Co., Ltd.</a>										</div>
									</div>

													</div>

						<div id="glanceCtnResponsiveRight" class="glance_ctn_responsive_right" data-panel="{&quot;flow-children&quot;:&quot;column&quot;}" >
																								<!-- when the javascript runs, it will set these visible or not depending on what fits in the area -->
																		<div class="responsive_block_header">Tags</div>
									<div class="glance_tags_ctn popular_tags_ctn" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}" >
										<div class="glance_tags_label">Popular user-defined tags for this product:</div>
										<div data-panel="{&quot;flow-children&quot;:&quot;row&quot;}" class="glance_tags popular_tags" data-appid="1904280">
											<a href="https://store.steampowered.com/tags/en/Early%20Access/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Early Access												</a><a href="https://store.steampowered.com/tags/en/RPG/?snr=1_5_9__409" class="app_tag" style="display: none;">
												RPG												</a><a href="https://store.steampowered.com/tags/en/Strategy/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Strategy												</a><a href="https://store.steampowered.com/tags/en/Casual/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Casual												</a><a href="https://store.steampowered.com/tags/en/Strategy%20RPG/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Strategy RPG												</a><a href="https://store.steampowered.com/tags/en/Colony%20Sim/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Colony Sim												</a><a href="https://store.steampowered.com/tags/en/Idler/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Idler												</a><a href="https://store.steampowered.com/tags/en/2D/?snr=1_5_9__409" class="app_tag" style="display: none;">
												2D												</a><a href="https://store.steampowered.com/tags/en/Isometric/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Isometric												</a><a href="https://store.steampowered.com/tags/en/Top-Down/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Top-Down												</a><a href="https://store.steampowered.com/tags/en/Building/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Building												</a><a href="https://store.steampowered.com/tags/en/Demons/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Demons												</a><a href="https://store.steampowered.com/tags/en/Fantasy/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Fantasy												</a><a href="https://store.steampowered.com/tags/en/Magic/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Magic												</a><a href="https://store.steampowered.com/tags/en/Management/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Management												</a><a href="https://store.steampowered.com/tags/en/Medieval/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Medieval												</a><a href="https://store.steampowered.com/tags/en/Base%20Building/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Base Building												</a><a href="https://store.steampowered.com/tags/en/Choices%20Matter/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Choices Matter												</a><a href="https://store.steampowered.com/tags/en/Resource%20Management/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Resource Management												</a><a href="https://store.steampowered.com/tags/en/Singleplayer/?snr=1_5_9__409" class="app_tag" style="display: none;">
												Singleplayer												</a><div class="app_tag add_button" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" onclick="ShowAppTagModal( 1904280 )">+</div>
										</div>
									</div>

																						<div id="reviewsHeader_responsive" style="display: none;" class="responsive_block_header">Reviews</div>
																	<div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" id="userReviews_responsive" style="display: none;" class="user_reviews" onclick="window.location='#app_reviews_hash'">

																				<div id="appReviewsAll_responsive" class="user_reviews_summary_row" onclick="window.location='#app_reviews_hash'" style="cursor: pointer;" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
											<div class="subtitle column all">All Reviews:</div>
											<div class="summary column">
																							No user reviews																						</div>
										</div>

																			</div>
																					</div>
						<div style="clear: both;"></div>
					</div>
				</div>

				<div data-panel="{&quot;maintainX&quot;:true,&quot;flow-children&quot;:&quot;column&quot;}" class="leftcol">
					<div class="highlight_ctn">

                                                    <div class="highlight_overflow">
                                <div id="highlight_player_area">
                                    <div class="highlight_player_area_spacer">
                                        <img src="https://store.cloudflare.steamstatic.com/public/images/game/game_highlight_image_spacer.gif">
                                    </div>

                                                                                                                <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_db4db7af6a7ae26955aeee7f140d9f807241200d.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_db4db7af6a7ae26955aeee7f140d9f807241200d.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_db4db7af6a7ae26955aeee7f140d9f807241200d.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_1247937c064ec5f630b2e2b0b263d7394419bf92.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_1247937c064ec5f630b2e2b0b263d7394419bf92.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_1247937c064ec5f630b2e2b0b263d7394419bf92.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_a174723418e7e92ed295ea5544e3d1177f45a4b4.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_a174723418e7e92ed295ea5544e3d1177f45a4b4.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_a174723418e7e92ed295ea5544e3d1177f45a4b4.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_ee54641bbff51a53c9ed9ed27c611573715108f9.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_ee54641bbff51a53c9ed9ed27c611573715108f9.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_ee54641bbff51a53c9ed9ed27c611573715108f9.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_3418641d7c85e807d7271fbb7a68042490fe63f6.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_3418641d7c85e807d7271fbb7a68042490fe63f6.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_3418641d7c85e807d7271fbb7a68042490fe63f6.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                            <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}"  class="highlight_player_item highlight_screenshot" id="highlight_screenshot_ss_cdc01127c7250faddc0c2daaf6781a161cc163fc.jpg" style="display: none;">
                                            <div class="screenshot_holder">
                                                <a class="highlight_screenshot_link" data-screenshotid="ss_cdc01127c7250faddc0c2daaf6781a161cc163fc.jpg" href="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_cdc01127c7250faddc0c2daaf6781a161cc163fc.1920x1080.jpg?t=1651712653" target="_blank" rel="noreferrer">
                                                    <img src="https://store.cloudflare.steamstatic.com/public/images/blank.gif">
                                                </a>
                                            </div>
                                        </div>
                                                                        <script type="text/javascript">
                                                                                var rgScreenshotURLs = {"ss_db4db7af6a7ae26955aeee7f140d9f807241200d.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_db4db7af6a7ae26955aeee7f140d9f807241200d_SIZE_.jpg?t=1651712653","ss_1247937c064ec5f630b2e2b0b263d7394419bf92.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_1247937c064ec5f630b2e2b0b263d7394419bf92_SIZE_.jpg?t=1651712653","ss_a174723418e7e92ed295ea5544e3d1177f45a4b4.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_a174723418e7e92ed295ea5544e3d1177f45a4b4_SIZE_.jpg?t=1651712653","ss_ee54641bbff51a53c9ed9ed27c611573715108f9.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_ee54641bbff51a53c9ed9ed27c611573715108f9_SIZE_.jpg?t=1651712653","ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd_SIZE_.jpg?t=1651712653","ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e_SIZE_.jpg?t=1651712653","ss_3418641d7c85e807d7271fbb7a68042490fe63f6.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_3418641d7c85e807d7271fbb7a68042490fe63f6_SIZE_.jpg?t=1651712653","ss_cdc01127c7250faddc0c2daaf6781a161cc163fc.jpg":"https:\/\/cdn.cloudflare.steamstatic.com\/steam\/apps\/1904280\/ss_cdc01127c7250faddc0c2daaf6781a161cc163fc_SIZE_.jpg?t=1651712653"};
                                    </script>
                                </div>
                                                                <div id="highlight_strip">
                                    <div data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;row&quot;}"  id="highlight_strip_scroll" style="width: 962px;">
                                        <div class="highlight_selector"></div>


                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_db4db7af6a7ae26955aeee7f140d9f807241200d.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_db4db7af6a7ae26955aeee7f140d9f807241200d.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_1247937c064ec5f630b2e2b0b263d7394419bf92.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_1247937c064ec5f630b2e2b0b263d7394419bf92.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_a174723418e7e92ed295ea5544e3d1177f45a4b4.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_a174723418e7e92ed295ea5544e3d1177f45a4b4.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_ee54641bbff51a53c9ed9ed27c611573715108f9.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_ee54641bbff51a53c9ed9ed27c611573715108f9.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_a0f560f749aa5f65878c2eda5bda0c0eee4423dd.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_80dadaf0daaefbb37a9e39323d1cdd63b2ae6c2e.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_3418641d7c85e807d7271fbb7a68042490fe63f6.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_3418641d7c85e807d7271fbb7a68042490fe63f6.116x65.jpg?t=1651712653">
                                            </div>
                                                                                    <div data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="highlight_strip_item highlight_strip_screenshot" id="thumb_screenshot_ss_cdc01127c7250faddc0c2daaf6781a161cc163fc.jpg" >
                                                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1904280/ss_cdc01127c7250faddc0c2daaf6781a161cc163fc.116x65.jpg?t=1651712653">
                                            </div>

                                                                            </div>
                                </div>
                                                                    <div class="slider_ctn">
                                        <div id="highlight_slider_left" class="slider_left"><span></span></div>
                                        <div class="slider" id="highlight_slider" >
                                            <div class="slider_bg">
                                            </div>
                                            <div class="handle">
                                            </div>
                                        </div>
                                        <div id="highlight_slider_right" class="slider_right"><span></span></div>
                                    </div>
                                    <script type="text/javascript">
                                        $J( function() {
                                            var player = new HighlightPlayer( {
                                                elemPlayerArea: 'highlight_player_area',
                                                elemStrip: 'highlight_strip',
                                                elemStripScroll: 'highlight_strip_scroll',
                                                elemSlider: 'highlight_slider',
                                                rgScreenshotURLs: rgScreenshotURLs
                                            } );

                                            $J('#highlight_slider_right').click( function() {
                                                player.Transition( true );
                                            });
                                            $J('#highlight_slider_left').click( function() {
                                                player.TransitionBack( true );
                                            });


                                                // swipe gesture handling for the media carousel

                                                // TODO: We may want to move all of this to the player class so it has built in touch gesture support.
                                                // First testing here as part of new mobile ux.

                                                var k_nElementWidth = 120;
                                                var k_playerItemClassName = '.highlight_player_item';
                                                var g_nStripWidth = 960;
                                                var g_nMediaItems = player.m_elemPlayerArea.find( '.highlight_player_item' ).length;
                                                var g_TouchEventStart = null;

                                                // Handle left/right swipe on the media playback by moving forward or backward when the swipe completes
                                                $J('#highlight_player_area').on("touchstart", function (event) {
                                                    g_TouchEventStart = event;
                                                });
                                                $J('#highlight_player_area').on("touchmove", function (event) {

                                                    if ( typeof g_TouchEventStart == undefined )
                                                        return;

                                                    var xdiff = Math.abs( g_TouchEventStart.originalEvent.changedTouches[0].screenX - event.originalEvent.changedTouches[0].screenX );
                                                    var ydiff = Math.abs( g_TouchEventStart.originalEvent.changedTouches[0].screenY - event.originalEvent.changedTouches[0].screenY );

                                                    // To reduce unintended page scroll during a horizontal swipe block the default handler when it looks like the user
                                                    // is in the process of performaing a horizontal scroll
                                                    if ( xdiff > ydiff && ( typeof event.cancelable !== 'boolean' || event.cancelable ) )
                                                        event.preventDefault();

                                                });
                                                $J('#highlight_player_area').on("touchend", function (eventEnd) {

                                                    if ( typeof g_TouchEventStart.originalEvent.changedTouches[0] == undefined ||
                                                        typeof eventEnd.originalEvent.changedTouches[0] == undefined )
                                                        return;

                                                    var xdiff = g_TouchEventStart.originalEvent.changedTouches[0].screenX - eventEnd.originalEvent.changedTouches[0].screenX;
                                                    var ydiff = g_TouchEventStart.originalEvent.changedTouches[0].screenY - eventEnd.originalEvent.changedTouches[0].screenY;

                                                    // clear out the touch start event
                                                    g_TouchEventStart = null;

                                                    // ignore the swipe if it was short and could've been intended as a tap, or the
                                                    // direction was more vertical than horizontal
                                                    if ( Math.abs( xdiff ) < 20 || Math.abs( ydiff ) > Math.abs( xdiff ) )
                                                        return;

                                                    // we're handling this event
                                                    if ( typeof event.cancelable !== 'boolean' || event.cancelable )
                                                        event.preventDefault();

                                                    // move forward or backward but don't wrap as that would be a jarring user experience
                                                    if ( xdiff > 0 )
                                                    {
                                                        var $NextItem = player.m_activeItem.next( k_playerItemClassName );
                                                        if ( $NextItem.length )
                                                            player.Transition( true );
                                                    }
                                                    else
                                                    {
                                                        var $NextItem = player.m_activeItem.prev( k_playerItemClassName );
                                                        if ( $NextItem.length )
                                                            player.TransitionBack( true );
                                                    }
                                                });

                                                // when the thumbnail strip is swiped move the strip at a granular level
                                                // so it feels active.  The active image does not update because when testing the code to
                                                // make it change the active element it seemed annoying
                                                var g_nSwipeStartingPosition = 0;
                                                var g_nMaxScroll = g_nMediaItems > 3 ? ( ( g_nMediaItems - 3 ) * k_nElementWidth ) : 0;

                                                $J('#highlight_strip_scroll').on("touchstart", function (event) {
                                                    g_TouchEventStart = event;
                                                    g_nSwipeStartingPosition = parseInt( player.m_elemStripScroll.css( 'left' ) );

                                                    player.StopCycle();
                                                });
                                                $J('#highlight_strip_scroll').on("touchmove", function (event) {

                                                    if ( typeof g_TouchEventStart == undefined )
                                                        return;

                                                    // To reduce unintended page scroll during a horizontal swipe block the default handler when it looks like the user
                                                    // is in the process of performaing a horizontal scroll
                                                    var xdiff = parseInt( event.originalEvent.changedTouches[0].screenX - g_TouchEventStart.originalEvent.changedTouches[0].screenX );
                                                    var ydiff = parseInt( event.originalEvent.changedTouches[0].screenY - g_TouchEventStart.originalEvent.changedTouches[0].screenY );
                                                    if ( Math.abs(ydiff) > Math.abs(xdiff) )
                                                        return;

                                                    // move the scroll strip without changing the selected item
                                                    var nNewScrollPosition = parseInt( g_nSwipeStartingPosition + xdiff );

                                                    // check that we don't scroll past the ends
                                                    if ( nNewScrollPosition > 0 )
                                                        nNewScrollPosition = 0;
                                                    else if ( nNewScrollPosition < (-1 * g_nMaxScroll) )
                                                        nNewScrollPosition = (-1 * g_nMaxScroll);

                                                    // set the new scroll position
                                                    player.m_elemStripScroll.css( 'left', nNewScrollPosition + 'px' );

                                                    // we're handling this event
                                                    if ( typeof event.cancelable !== 'boolean' || event.cancelable )
                                                        event.preventDefault();
                                                });
                                                $J('#highlight_strip_scroll').on("touchend", function (eventEnd) {
                                                    g_TouchEventStart = null;
                                                    g_nSwipeStartingPosition = 0;
                                                });


                                            if( window.location.hash )
                                            {
                                                var ssid = window.location.hash.substr(1);
                                                player.HighlightScreenshot(ssid);
                                            }
                                        } );
                                    </script>
                                                            </div>
                        					</div>
				</div>
				<div style="clear: both;"></div>
			</div>
			</div>






			<div class="queue_overflow_ctn">
									<div class="queue_ctn">
											<div id="queueActionsCtn" class="queue_actions_ctn">
							<p><a href="https://store.steampowered.com/login/?redir=app%2F1904280&snr=1_5_9_">Sign in</a> to add this item to your wishlist, follow it, or mark it as ignored</p>
						</div>
					</div>

				<!-- button area with share, follow, etc. for responsive ux -->
				<div id="rowBtnActions" data-panel="{&quot;maintainY&quot;:true,&quot;flow-children&quot;:&quot;row&quot;}" style="display: none;"></div>

			</div>




							<div id="purchaseOptionsContent" class="purchase_options_content" style="display: none;">
					<!-- game_area_purchase goes here -->
				</div>

		</div>





		<div class="page_content" data-panel="[]" >

				<!-- Right Column -->
				<div class="rightcol game_meta_data" data-panel="{&quot;flow-children&quot;:&quot;column&quot;}" >
					<div id="responsive_apppage_details_left_ctn"></div>

											<div id="appLinksAndInfoCtn" style="display:none;">
							<div class="responsive_block_header">Links &amp; info</div>
							<div id="appLinksAndInfo" class="game_page_autocollapse" style="max-height: 180px;"></div>


						</div>

					<div id="responsive_apppage_details_right_ctn"></div>
					<div style="clear: both;"></div>

													<div class="block responsive_apppage_details_right heading responsive_hidden">Is this game relevant to you?</div>
							<div class="block responsive_apppage_details_right recommendation_noinfo responsive_hidden" >
								<p>
									Sign in to see reasons why you may or may not like this based on your games, friends, and curators you follow.
								</p>
								<br>

																	<a class="btnv6_blue_hoverfade btn_medium" href="https://store.steampowered.com/login/?redir=app/1904280"><span>Sign In</span></a>

																			or										<a class="btnv6_blue_hoverfade btn_medium" href="steam://store/1904280"><span>Open in Steam</span></a>
																								</div>











											<div class="responsive_block_header responsive_apppage_details_left">Features</div>
						<div class="block responsive_apppage_details_left" id="category_block">
							<div data-panel="{&quot;type&quot;:&quot;PanelGroup&quot;}" class="game_area_features_list_ctn">
								<a class="game_area_details_specs_ctn" data-panel="{&quot;flow-children&quot;:&quot;column&quot;}" href="https://store.steampowered.com/search/?category2=2&snr=1_5_9__423"><div class="icon"><img class="category_icon" src="https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_singlePlayer.png"></div><div class="label">Single-player</div></a>									<div class="game_area_details_specs_ctn learning_about">
										<div class="icon"><img class="category_icon" src="https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_learning_about_game.png"></div>
										<div class="label">Steam is learning about this game&nbsp;
										<span class="tooltip" data-tooltip-html="This game is not currently eligible to appear in certain showcases on your Steam Profile, and does not contribute to global Achievement or game collector counts.">
											<img src="https://store.cloudflare.steamstatic.com/public/shared/images/ico/icon_questionmark.png">
										</span></div>

									</div>
																</div>





													</div>
																					<div class="block responsive_apppage_details_right">
							<div class="block_title" id="LanguagesHeader">
								Languages<span class="responsive_hidden">:</span>
							</div>


<div id="bannerLanguages" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="responsive_banner_link" style="display: none" onclick="ToggleBannerContentVisibility('#languageTable', '#expandLanguageBtn')">
	<div class="responsive_banner_link_title">
		English	</div>
	<div id="expandLanguageBtn" class="expand_section"></div>
</div>
<div id="languageTable">

<table  class="game_language_options" cellpadding="0" cellspacing="0">
	<tr>
		<th style="width: 94px;"></th>
				<th class="checkcol">Interface</th>
		<th class="checkcol">Full Audio</th>
		<th class="checkcol">Subtitles</th>
	</tr>

			<tr style="" class="">
			<td style="width: 94px; text-align: left" class="ellipsis">
				English			</td>
							<td class="checkcol">
					 <span>&#10004;</span> 				</td>
				<td class="checkcol">
									</td>
				<td class="checkcol">
									</td>
					</tr>
	</table>


</div>

						</div>




					<div id="appDetailsUnderlinedLinks" class="block responsive_apppage_details_left game_details underlined_links">
						<div class="block_content">
							<div class="block_content_inner">
								<div id="genresAndManufacturer" class="details_block">

			<b>Title:</b> Feartress<br>

				<b>Genre:</b> <span data-panel="{&quot;flow-children&quot;:&quot;row&quot;}"><a href="https://store.steampowered.com/genre/Casual/?snr=1_5_9__408">Casual</a>, <a href="https://store.steampowered.com/genre/Indie/?snr=1_5_9__408">Indie</a>, <a href="https://store.steampowered.com/genre/RPG/?snr=1_5_9__408">RPG</a>, <a href="https://store.steampowered.com/genre/Strategy/?snr=1_5_9__408">Strategy</a>, <a href="https://store.steampowered.com/genre/Early%20Access/?snr=1_5_9__408">Early Access</a></span><br>

			<div class="dev_row">
			<b>Developer:</b>

				<a href="https://store.steampowered.com/search/?developer=Frederik%20List&snr=1_5_9__408">Frederik List</a>, <a href="https://store.steampowered.com/search/?developer=Aaron%20Miles&snr=1_5_9__408">Aaron Miles</a>
		</div>

			<div class="dev_row">
			<b>Publisher:</b>

				<a href="https://store.steampowered.com/search/?publisher=Foo%20Dogs%20Co.%2C%20Ltd.&snr=1_5_9__422">Foo Dogs Co., Ltd.</a>
		</div>


	            <b>Release Date:</b> TBD<br>

            	</div>


<div class="details_block" style="padding-top: 14px;">

				<a class="linkbar" href="https://steamcommunity.com/linkfilter/?url=https://feartress.com" target="_blank" rel="noreferrer noopener" >
			Visit the website <img src="https://store.cloudflare.steamstatic.com/public/images/v5/ico_external_link.gif" border="0" align="bottom">
		</a>








			<a class="linkbar responsive_chevron_right" href="https://store.steampowered.com/newshub/?appids=1904280&amp;snr=1_5_9__408" target="_blank" rel="noreferrer" >
			View update history		</a>
		<a class="linkbar responsive_chevron_right" href="https://store.steampowered.com/newshub/app/1904280?snr=1_5_9__408" target="_blank" rel="noreferrer" >
			Read related news		</a>

			<a class="linkbar responsive_chevron_right" href="https://steamcommunity.com/app/1904280/discussions/" target="_blank" rel="noreferrer" >
			View discussions		</a>


	        <a class="linkbar responsive_chevron_right" href="https://steamcommunity.com/actions/Search?T=ClanAccount&K=Feartress">
            Find Community Groups        </a>
    </div>
							</div>
						</div>
											</div>

											<div id="shareEmbedRow" class="block responsive_apppage_details_left" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}">
							<a class="btnv6_blue_hoverfade btn_medium" href="#" onclick="ShowShareDialog(); return false;"><span>Share</span></a>
							<a class="btnv6_blue_hoverfade btn_medium" href="#" onclick="ShowEmbedWidget(1904280); return false;"><span>Embed</span></a>
							<a id="ReportAppBtn" class="btnv6_blue_hoverfade btn_medium" href="javascript:void(0)" onclick="ShowReportDialog(1904280)"><span data-tooltip-text="Report this Product"><i class="ico16 reportv6"></i>&nbsp;</span></a>
						</div>

													<div id="shareBtn" style="display:none;"><a class="btnv6_blue_hoverfade btn_medium" onclick="ShowShareDialog(); return false;"><span><img id="shareImg" src="https://store.cloudflare.steamstatic.com/public/shared/images/icon_share_android.svg"></span></a></div>
							<div id="reportBtn" style="display:none;"><a class="btnv6_blue_hoverfade btn_medium" href="javascript:void(0)" onclick="ShowReportDialog(1904280)"><span><img src="https://store.cloudflare.steamstatic.com/public/shared/images/icon_report.svg"></span></a></div>




				</div>
				<!-- End Right Column -->


				<div class="leftcol game_description_column"  data-panel="{&quot;flow-children&quot;:&quot;column&quot;}" >





						<div id="earlyAccessHeader" class="early_access_header">
							<div class="heading">
																	<h1 class="inset">Early Access Game</h1>
									<h2 class="inset">Get instant access and start playing; get involved with this game as it develops.</h2>
									<p><span>Note:</span> This Early Access game is not complete and may or may not change further. If you are not excited to play this game in its current state, then you
									should wait to see if the game progresses further in development. <a href="https://store.steampowered.com/earlyaccessfaq/?snr=1_5_9_">Learn more</a></p>
															</div>
							<div id="earlyAccessBody" class="devnotes">
																	<div class="devs_say">What the developers have to say:</div>

								<div id="devnotes_expander">
																			<h1>Why Early Access?</h1>
										&ldquo;There are still many features I want to add to the game and build on top of current amount of content, however, I would like some feedback from players to decide on which direction to take the game in from here.&rdquo;

										<h1>Approximately how long will this game be in Early Access?</h1>
										&ldquo;Estimated 12 months.&rdquo;

										<h1>How is the full version planned to differ from the Early Access version?</h1>
										&ldquo;I plan to add more content such as new skill points in the form of <i>perk books</i> and 3 more maps that conclude the story of the game, all while retaining the core gameplay. I also plan to add sound to the game.&rdquo;

										<h1>What is the current state of the Early Access version?</h1>
										&ldquo;See the About section for info.&rdquo;

										<h1>Will the game be priced differently during and after Early Access?</h1>
										&ldquo;I don't plan to change the price.&rdquo;

										<h1>How are you planning on involving the Community in your development process?</h1>
										&ldquo;I encourage players to join the game's discord server and discuss bugs/features and general feedback to know which kind of themes players would want for the additional skills also known as perk <i>books</i>.&rdquo;

																	</div> <!-- /devnotes_expander -->
								<a class="morebutton" id="devnotes_more" href="#"  onclick="$J('#devnotes_expander').css({'max-height': 'none'}); $J(this).hide(); return false;">Read more</a>
							</div>
						</div>




					<div id="game_area_purchase" class="game_area_purchase">







																			<!--[if lte IE 7]>
<style type="text/css">
.game_area_purchase_game_dropdown_right_panel .btn_addtocart { float: none; }
</style>
<![endif]-->



		<div class="game_area_comingsoon game_area_bubble">
			<div class="content">
				                                        <span class="not_yet">This game is not yet available on Steam</span>
					<h1>Planned Release Date: <span>TBD</span></h1>
                											</div>

                            <div id="add_to_wishlist_area2" class="wishlist_add_reminder">


                                    <div class="wishlist_note">Interested?<br>Add to your wishlist and get notified when it becomes available.</div>
                        <a data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="btn_green_steamui btn_medium" href="javascript:AddToWishlist( 1904280, 'add_to_wishlist_area2', 'add_to_wishlist_area_success', 'add_to_wishlist_area_fail', '1_5_9__407', 'add_to_wishlist_area' );" data-tooltip-text="Get notified by email when your wishlisted items get released or are on sale">
                            <span>Add to your wishlist</span>
                        </a>
                                </div>
            		</div>

					</div>
					<!-- game_area_purchase -->


											<div id="bannerCommunity" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" class="responsive_banner_link" style="display: none" onclick="window.location='https://steamcommunity.com/app/1904280'">
							<div class="responsive_banner_link_title responsive_chevron_right">View Community Hub</div>
						</div>

					<div class="purchase_area_spacer">&nbsp;</div>





				<div data-featuretarget="events-row"></div>



								<!-- Discussions block -->

					<div class="early_access_banner">
						<div class="img"></div>

						<a class="btnv6_blue_hoverfade btn_border_2px btn_medium" href="https://steamcommunity.com/app/1904280/discussions/">
							<span>See all discussions</span>
						</a>

						<p>Report bugs and leave feedback for this game on the discussion boards</p>

					</div>



									<div id="contentForThisGame_ctn">
					</div>
									<div data-panel="{&quot;type&quot;:&quot;PanelGroup&quot;}" id="aboutThisGame" class="game_page_autocollapse" style="max-height: 850px;">
						<div id="game_area_description" class="game_area_description">
							<h2>About This Game</h2>
							You are a soul without a body floating around in a world where a mysterious elemental corruption has started to spread. With the help of a long necked cat, you gain the ability to rebirth into other dimensions to find the source of the corruption and eliminate it.<br><br>Feartress is a new take on the genre of incremental games where you go on a journey to collect all the 21 elemental pearls and restore balance to the universe. <br>You build up a settlement in each world and destroy enemy structures to find loot and unlock new perks. Collect epic and legendary gear to help you venture into new worlds with increasingly powerful enemies.<br><br><strong>The game features:</strong><br>- 25+ friendly unit types to hire.<br>- 20+ friendly building types to build.<br>- 50+ types of enemies to fight.<br>- Randomly generated equippable items.<br>- 100+ perks to unlock.<br>- 13 Rebirths (prestiges) into new worlds that you have to clear						</div>
					</div>



					<div class="game_page_autocollapse sys_req" style="max-height: 300px;">
		<h2>System Requirements</h2>
					<div class="sysreq_tabs">
									<div class="sysreq_tab active" data-os="win">
						Windows					</div>
									<div class="sysreq_tab " data-os="mac">
						macOS					</div>
									<div class="sysreq_tab " data-os="linux">
						SteamOS + Linux					</div>
								<div style="clear: left;"></div>
			</div>
				<div class="sysreq_contents">
							<div class="game_area_sys_req sysreq_content active" data-os="win">
											<div class="game_area_sys_req_leftCol">
							<ul>
								<strong>Minimum:</strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Windows 7<br></li><li><strong>Processor:</strong> Intel Core i3<br></li><li><strong>Memory:</strong> 4 GB RAM<br></li><li><strong>Storage:</strong> 200 MB available space</li></ul>							</ul>
						</div>
																<div class="game_area_sys_req_rightCol">
							<ul>
								<strong>Recommended:</strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Windows 10 or newer<br></li><li><strong>Processor:</strong> Intel Core i5<br></li><li><strong>Memory:</strong> 8 GB RAM<br></li><li><strong>Storage:</strong> 200 MB available space</li></ul>							</ul>
						</div>
										<div style="clear: both;"></div>
				</div>
							<div class="game_area_sys_req sysreq_content " data-os="mac">
											<div class="game_area_sys_req_leftCol">
							<ul>
								<strong>Minimum:</strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> macOS 10.11 (El Capitan)<br></li><li><strong>Processor:</strong> Intel Core i3<br></li><li><strong>Memory:</strong> 4 GB RAM<br></li><li><strong>Storage:</strong> 200 MB available space</li></ul>							</ul>
						</div>
																<div class="game_area_sys_req_rightCol">
							<ul>
								<strong>Recommended:</strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> macOS 12 (Monterey) or newer<br></li><li><strong>Processor:</strong> M1<br></li><li><strong>Memory:</strong> 8 GB RAM<br></li><li><strong>Storage:</strong> 200 MB available space</li></ul>							</ul>
						</div>
										<div style="clear: both;"></div>
				</div>
							<div class="game_area_sys_req sysreq_content " data-os="linux">
											<div class="game_area_sys_req_leftCol">
							<ul>
								<strong>Minimum:</strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Ubuntu 14.04<br></li><li><strong>Processor:</strong> Intel Core i3<br></li><li><strong>Memory:</strong> 4 GB RAM<br></li><li><strong>Storage:</strong> 200 MB available space</li></ul>							</ul>
						</div>
																<div class="game_area_sys_req_rightCol">
							<ul>
								<strong>Recommended:</strong><br><ul class="bb_ul"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Ubuntu 14.04 and newer<br></li><li><strong>Processor:</strong> Intel Core i5<br></li><li><strong>Memory:</strong> 8 GB RAM<br></li><li><strong>Storage:</strong> 200 MB available space</li></ul>							</ul>
						</div>
										<div style="clear: both;"></div>
				</div>
					</div>
	</div>
	<script type="text/javascript">
		$J( function() {
			var $Tabs = $J('.sysreq_tab');
			var $Content = $J('.sysreq_content');

			$Tabs.click( function() {
				var $Tab = $J(this);
				$Tabs.removeClass('active');
				$Tab.addClass('active');

				$Content.removeClass('active');
				$Content.filter('[data-os=' + $Tab.data('os') + ']').addClass('active');

				$Content.trigger('gamepage_autocollapse_expand');
			});
		} );
	</script>





														<div class="block" id="recommended_block">
						<div class="block_header">
							<div class="right">
								<a href="https://store.steampowered.com/recommended/morelike/app/1904280/?snr=1_5_9__300" class="deck_view_all_action_link">See all</a>
							</div>
							<h2>More like this</h2>
						</div>
						<div class="block_responsive_horizontal_scroll store_horizontal_autoslider block_content nopad" id="recommended_block_content" data-usability="1000">
						</div>
					</div>

				<div id="responsive_apppage_reviewblock_ctn" class="rightcol game_meta_data"></div>




			</div>

			<div style="clear: both;"></div>
			</div>


		<div class="review_ctn">
			<div class="page_content">

				<div id="app_reviews_hash" class="app_reviews_area">
							<div class="review_box">
			<div class="noReviewsYetTitle">
				There are no reviews for this product			</div>

						<div id="noReviewsWriteOne">
				<div class="noReviewsYetSub">
					<p>You can write your own review for this product to share your experience with the community. Use the area above the purchase buttons on this page to write your review.</p>
				</div>
			</div>

			<div style="clear: left; height: 40px;"></div>
		</div>
						</div>
			</div>
		</div>

						<div id="reviewSettingsPopupCtn" style="display: none;">
					<div id="reviewSettingsPopupContent" class="review_settings_popup_content" >
						<div class="review_settings_popup_header">
							<div>Review Filters</div>
							<div onclick="CloseReviewSettingsModal();"><img src="https://store.cloudflare.steamstatic.com/public/images/v6/close_btn.png" /></div>
						</div>
					</div>
				</div>


			</div>

	<div data-panel="{&quot;maintainY&quot;:true,&quot;bFocusRingRoot&quot;:true,&quot;onMoveDown&quot;:&quot;BlockMovement&quot;,&quot;onMoveUp&quot;:&quot;BlockMovement&quot;,&quot;flow-children&quot;:&quot;column&quot;}" id="purchaseOptionsContentTablet" class="purchase_options_content_tablet" style="display: none;">

		<!-- game_area_purchase goes here -->
	</div>
	</div>

</div>

		<div class="hover game_hover" id="global_hover" style="display: none; left: 0; top: 0;">
			<div class="game_hover_box hover_box">
				<div class="content" id="global_hover_content">
				</div>
			</div>
			<div class="hover_arrow_left"></div>
			<div class="hover_arrow_right"></div>
		</div>
<div id="EmbedModal"  style="display: none">
	<div id="widget_create">
		<p>You can use this widget-maker to generate a bit of HTML that can be embedded in your website to easily allow customers to purchase this game on Steam.</p>

				<p class="small">Enter up to 375 characters to add a description to your widget:</p>
		<div class="app_embed_dialog_description">
			<textarea name="w_text" placeholder="Feartress is an incremental fantasy RPG where you gather resources, build structures and hire workers and armies to help you succeed in battle and expand your territory." maxlength="375"></textarea>
		</div>

		<div class="buttoncontainer">
			<a class="btnv6_blue_hoverfade btn_medium " href="#" onclick="CreateWidget(1904280); return false;"><span>Create widget</span></a>
		</div>
	</div>
	<div id="widget_finished" style="display: none;">
		<div id="widget_container"></div>

		<p class="small">Copy and paste the HTML below into your website to make the above widget appear</p>
		<textarea id="widget_code" style=""></textarea>
	</div>

</div>

<div id="ShareModal" style="display: none">
	<div class="share share_dialog"><a href="https://store.steampowered.com/share/facebook/app/1904280" target="_blank" rel="noreferrer" title="Share on Facebook"><img src="https://store.cloudflare.steamstatic.com/public/images/social/facebook_large.png"></a><a href="https://store.steampowered.com/share/twitter/app/1904280" target="_blank" rel="noreferrer" title="Share on Twitter"><img src="https://store.cloudflare.steamstatic.com/public/images/social/twitter_large.png"></a><a href="https://store.steampowered.com/share/reddit/app/1904280" target="_blank" rel="noreferrer" title="Share on Reddit"><img src="https://store.cloudflare.steamstatic.com/public/images/social/reddit_large.png"></a><div class="share_dialog_content"><label for="linkShareValue" hidden>Link to the game's store page</label><textarea id="shareDialogLinkStoreLink" class="share_dialog_value" onclick="ShareDialogCopyToClipboard();" readonly/>https://store.steampowered.com/app/1904280/Feartress/</textarea></div><div id="shareDialogResult" class="share_dialog_result"></div></div></div>

<div id="application_root"></div>

	<div id="app_tagging_modal" class="app_tag_modal nologin" style="display: none;">
		<div class="app_tag_modal_content">
			<div class="app_tag_modal_seperator"></div>
			<div class="app_tag_modal_left">
				<h2>Popular user-defined tags for this product:<span class="app_tag_modal_tooltip" data-tooltip-text="These are tags applied to the product by the most users.  You can click a tag to find other products with that tag applied.  Or, you can hit the plus symbol for any existing tags to increase that tag's popularity on this product.">(?)</span></h2>
				<div class="app_tags popular_tags">
				</div>
			</div>
			<div class="app_tag_modal_right">
									<h2>Sign In</h2>
					<p>Sign in to add your own tags to this product.</p>
					<p>
						<a class="btnv6_blue_hoverfade btn_medium" href="https://store.steampowered.com/login/?redir=app/1904280">
							<span>Sign In</span>
						</a>
					</p>
							</div>
			<div style="clear: both;"></div>
		</div>
	</div>
		<script type="text/javascript">
		$J( function() {
			InitAppTagModal( 1904280,
				[{"tagid":493,"name":"Early Access","count":235},{"tagid":122,"name":"RPG","count":213,"browseable":true},{"tagid":9,"name":"Strategy","count":207,"browseable":true},{"tagid":597,"name":"Casual","count":203,"browseable":true},{"tagid":17305,"name":"Strategy RPG","count":178,"browseable":true},{"tagid":220585,"name":"Colony Sim","count":172,"browseable":true},{"tagid":615955,"name":"Idler","count":163,"browseable":true},{"tagid":3871,"name":"2D","count":155,"browseable":true},{"tagid":5851,"name":"Isometric","count":147,"browseable":true},{"tagid":4791,"name":"Top-Down","count":139,"browseable":true},{"tagid":1643,"name":"Building","count":130,"browseable":true},{"tagid":9541,"name":"Demons","count":119,"browseable":true},{"tagid":1684,"name":"Fantasy","count":117,"browseable":true},{"tagid":4057,"name":"Magic","count":104,"browseable":true},{"tagid":12472,"name":"Management","count":90,"browseable":true},{"tagid":4172,"name":"Medieval","count":75,"browseable":true},{"tagid":7332,"name":"Base Building","count":59,"browseable":true},{"tagid":6426,"name":"Choices Matter","count":42,"browseable":true},{"tagid":8945,"name":"Resource Management","count":26,"browseable":true},{"tagid":4182,"name":"Singleplayer","count":24,"browseable":true}],
				[],
				"1_5_9__410",
				"1_5_9__411",
				null			);

						if ( typeof GDynamicStore != 'undefined' )
				GDynamicStore.FixupNamePortion();

					});
	</script>

<link href="https://store.cloudflare.steamstatic.com/public/css/applications/store/libraries~main.css?v=JCHtRmRDXnrj&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<link href="https://store.cloudflare.steamstatic.com/public/css/applications/store/main.css?v=_8Fl_okkVtIW&amp;l=english&amp;_cdn=cloudflare" rel="stylesheet" type="text/css" >
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/applications/store/manifest.js?v=9r-bTOaMFihc&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/applications/store/libraries~main.js?v=i_fHFrIuXYW8&amp;l=english&amp;_cdn=cloudflare" ></script>
<script type="text/javascript" src="https://store.cloudflare.steamstatic.com/public/javascript/applications/store/main.js?v=sJKw9F8n5rGz&amp;l=english&amp;_cdn=cloudflare" ></script>

		</div>	<!-- responsive_page_legacy_content -->

		<div id="footer_spacer" style="" class=""></div>
<div id="footer"  class="">
<div class="footer_content">

    <div class="rule"></div>
				<div id="footer_logo_steam"><img src="https://store.cloudflare.steamstatic.com/public/images/v6/logo_steam_footer.png" alt="Valve Software" border="0" /></div>

    <div id="footer_logo"><a href="http://www.valvesoftware.com" target="_blank" rel="noreferrer"><img src="https://store.cloudflare.steamstatic.com/public/images/footerLogo_valve_new.png" alt="Valve Software" border="0" /></a></div>
    <div id="footer_text" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}" >
        <div>&copy; 2022 Valve Corporation.  All rights reserved.  All trademarks are property of their respective owners in the US and other countries.</div>
        <div>VAT included in all prices where applicable.&nbsp;&nbsp;

            <a href="https://store.steampowered.com/privacy_agreement/?snr=1_44_44_" target="_blank" rel="noreferrer">Privacy Policy</a>
            &nbsp; | &nbsp;
            <a href="https://store.steampowered.com/legal/?snr=1_44_44_" target="_blank" rel="noreferrer">Legal</a>
            &nbsp; | &nbsp;
            <a href="https://store.steampowered.com/subscriber_agreement/?snr=1_44_44_" target="_blank" rel="noreferrer">Steam Subscriber Agreement</a>
            &nbsp; | &nbsp;
            <a href="https://store.steampowered.com/steam_refunds/?snr=1_44_44_" target="_blank" rel="noreferrer">Refunds</a>
            &nbsp; | &nbsp;
            <a href="https://store.steampowered.com/account/cookiepreferences/?snr=1_44_44_" target="_blank" rel="noreferrer">Cookies</a>

        </div>
					<div class="responsive_optin_link">
				<div class="btn_medium btnv6_grey_black" onclick="Responsive_RequestMobileView()">
					<span>View mobile website</span>
				</div>
			</div>

    </div>



    <div style="clear: left;"></div>
	<br>

    <div class="rule"></div>

    <div class="valve_links" data-panel="{&quot;flow-children&quot;:&quot;row&quot;}" >
        <a href="http://www.valvesoftware.com/about" target="_blank" rel="noreferrer">About Valve</a>
        &nbsp; | &nbsp;<a href="http://www.valvesoftware.com" target="_blank" rel="noreferrer">Jobs</a>
        &nbsp; | &nbsp;<a href="http://www.steampowered.com/steamworks/" target="_blank" rel="noreferrer">Steamworks</a>
        &nbsp; | &nbsp;<a href="https://partner.steamgames.com/steamdirect" target="_blank" rel="noreferrer">Steam Distribution</a>
        &nbsp; | &nbsp;<a href="https://help.steampowered.com/en/?snr=1_44_44_">Support</a>
        		&nbsp; | &nbsp;<a href="https://store.steampowered.com/digitalgiftcards/?snr=1_44_44_" target="_blank" rel="noreferrer">Gift Cards</a>
		&nbsp; | &nbsp;<a href="https://steamcommunity.com/linkfilter/?url=http://www.facebook.com/Steam" target="_blank" rel="noopener"><img src="https://store.cloudflare.steamstatic.com/public/images/ico/ico_facebook.gif"> Steam</a>
		&nbsp; | &nbsp;<a href="http://twitter.com/steam" target="_blank" rel="noreferrer"><img src="https://store.cloudflare.steamstatic.com/public/images/ico/ico_twitter.gif"> @steam</a>
            </div>

</div>
</div>
	</div>	<!-- responsive_page_content -->

</div>	<!-- responsive_page_frame -->
</body>
</html>`;
