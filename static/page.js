const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
const stuff = require('./info');

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case '/go_full/previewVideoMaker/theme/dark': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			title = 'Preview Video Maker - OurAnimate';
			attrs = {
				data: 'https://josephcrosmanplays532.github.io/animation/503/go_full.swf',
				type: 'application/x-shockwave-flash', id: 'Studio', swf: 'https://josephcrosmanplays532.github.io/animation/503/go_full.swf',
                                width: '100%', height: '100%', align: 'middle', allowScriptAccess: 'always', allowFullScreen: 'true', wmode: 'window',
				hasVersion: '10.3',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': 'https://josephcrosmanplays532.github.io/store/50/<store>', 'isEmbed': 1, 
					'ctc': 'go',
					'ut': 60, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go', 'lid': 13, 'isLogin': 'Y', 'retut': 1,
					'clientThemePath': 'https://josephcrosmanplays532.github.io/static/477/<client_theme>', 'themeId': 'business', 
					'tlang': 'en_US',
					'presaveId': presave, 'goteam_draft_only': 1, 'isWide': 1, 'tray': 'retro', 
					'nextUrl': 'https://action-ouranimate.herokuapp.com/dashboard/videos',
				},
				movie: 'https://josephcrosmanplays532.github.io/animation/503/go_full.swf',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}	
			
		case '/go_full/previewVideoMaker/theme/light': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			title = 'Preview Video Maker - OurAnimate';
			attrs = {
				data: 'https://josephcrosmanplays532.github.io/animation/503/go_full.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'movieId': '', 'loadas': 0, 'asId': '', 'originalId': '', 'apiserver': '/', 
					'storePath': 'https://josephcrosmanplays532.github.io/store/50/<store>', 
					'clientThemePath': 'https://josephcrosmanplays532.github.io/static/477/<client_theme>',
					'animationPath': 'https://josephcrosmanplays532.github.io/animation/503/', 'userId': '0cf4CMw1ZNCk', 
					'username': 'bakeryb40488', 
					'uemail': 'bakeryb40488@gmail.com', 'numContact': '0', 'ut': 23, 've': false, 'isEmbed': 0, 
					'nextUrl': 'https://action-ouranimate.herokuapp.com/dashboard/videos', 
					'bgload': 'https://josephcrosmanplays532.github.io/animation/503/go_full.swf', 'lid': '1', 
					'ctc': 'go', 'themeColor': 'silver', 'tlang': 'en_US', 'siteId': '13', 'templateshow': 'false', 
					'forceshow':'false', 'appCode': 'go', 'lang': 'en', 'tmcc': 4048901, 'fb_app_url': '/', 'is_published': 
					'0', 'is_private_shared': '1', 'is_password_protected': false, 'upl': 1, 'hb': '1', 'pts': '1', 'msg_index': '', 
					'ad': 0, 'has_asset_bg': 1, 'has_asset_char': 0, 'initcb': 'studioLoaded', 'retut': 0, 'featured_categories': null,
					's3base': 'https://s3.amazonaws.com/fs.goanimate.com/,https://assets.vyond.com/', 'st': '', 'uisa': 0, 
					'u_info': 'OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ',
					'tm': 'FIN', 'tray': 'retro', 'isWide': 1, 'newusr': 1, 'goteam_draft_only': 0,
				},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}
		
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(`<link href="/html/css/oldglobal.css" rel="stylesheet" type="text/css"><script>document.title='${title}',flashvars=${JSON.stringify(params.flashvars)}</script><body style="margin:0px"><div class="warning">You need an account in order to add voices, save, and view your videos! <a href="https://action-ouranimate.herokuapp.com/signup">Get One Now!</a> <a href="https://action-ouranimate.herokuapp.com/login">Login</a></div>${toObjectString(attrs, params)
		}</body>${stuff.pages[url.pathname] || ''}`);
	return true;
}
