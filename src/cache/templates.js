angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/settings/settings.html","		<section class=\"column\">\n			<div class=\"row badge warning\" data-ng-if=\"vm.options.config.folders.length === 0\">\n				<span>There are no folders elegible for moving. Please enter them, in the input box below</span>\n			</div>\n\n			<div class=\"row\">\n				<form class=\"cd-form\">\n				<fieldset>\n					<legend>Folders elegible for the moving process</legend>\n\n					<p>Specify which folders will be available for moving. All folders should be relative to /mnt/user.</p>\n					<p>For example, you may want to move only movies, but not tvshows. You have /mnt/user/Movies and /mnt/user/TVShows. In the input box below, you would enter Movies.</p>\n\n					<div>\n						<label>Folder</label>\n						<input type=\"text\" placeholder=\"folder elegible for moving\" data-ng-model=\"vm.folder\" data-ng-keyup=\"$event.keyCode == 13 && vm.addFolder()\">\n					</div>\n\n					<div>\n						<a href=\"#\" class=\"btn btn-primary\" data-ng-click=\"vm.addFolder()\">Add</a>\n					</div>\n\n					<legend>Folders Selected</legend>\n\n					<div>\n						<table class=\"settings\">\n						<thead>\n							<tr>\n								<th>#</th>\n								<th>Folder</th>\n							</tr>\n						</thead>\n						<tbody>\n							<tr data-ng-repeat=\"folder in vm.options.config.folders\">\n								<td><a href=\"#\" data-ng-click=\"vm.removeFolder(folder)\"><img src=\"/img/no.png\"></a></td>\n								<td>{{folder}}</td>\n							</tr>\n						</tbody>\n						</table>\n					</div>\n				</fieldset>\n				</form>\n			</div>\n			</form>\n\n		</section>");
$templateCache.put("app/template/main.html","		<section class=\"column\">\n			<div class=\"row badge warning\" data-ng-if=\"!vm.ok\">\n				<span>The array is not operational. Please start the array first.</span>\n			</div>\n\n			<div class=\"row dashboard-header\">\n				<div class=\"dashboard-status\">\n					STATUS: &nbsp; <span class=\"label\" data-ng-class=\"vm.ok ? \'label-success\' : \'label-warning\'\">{{vm.condition.state | lowercase}}</span>\n				</div>\n\n				<div class=\"loading\" data-ng-if=\"vm.showProgress\">\n				  <div class=\"loading-bar\"></div>\n				  <div class=\"loading-bar\"></div>\n				  <div class=\"loading-bar\"></div>\n				  <div class=\"loading-bar\"></div>\n				</div>		\n\n				<div class=\"dashboard-commands\">\n					<span>&nbsp;</span>\n					<a href=\"#\" ng-click=\"vm.calculateBestFit()\" class=\"btn btn-primary\" data-ng-class=\"{disabled: vm.disableControls}\">CALCULATE</a>\n					<span>&nbsp; | &nbsp;</span>\n					<a href=\"#\" ng-click=\"vm.move()\" class=\"btn btn-primary\" data-ng-class=\"{disabled: vm.disableControls}\">MOVE</a>\n					<div class=\"dryrun\"> <input type=\"checkbox\" data-ng-checked=\"{{vm.options.config.dryRun}}\" data-ng-model=\"vm.options.config.dryRun\" data-ng-change=\"vm.flipDryRun()\" data-ng-class=\"{disabled: vm.disableControls}\" /> <span>dry-run </span> </div>\n				</div>				\n			</div>\n\n			<div class=\"row console\" data-ng-if=\"vm.moveStarted\">\n				<div class=\"console__lines\" unb-scroll-bottom=\"vm.lines\">\n					<p ng-repeat=\"line in vm.lines track by $index\" class=\"console__line\">{{line}}</p>\n				</div>\n			</div>\n\n			<table class=\"row dashboard\" data-ng-if=\"vm.ok\">\n			<thead>\n				<tr>\n			        <th>DISK</th>\n			        <th>SERIAL</th>\n			        <th>FROM </th>\n			        <th>TO</th>\n			        <th>SIZE</th>\n			        <th>FREE</th>\n			        <th>FILL</th>\n			        <th>PLAN</th>\n				</tr>\n			</thead>\n			<tbody>\n				<tr data-ng-repeat=\"disk in vm.disks\">\n			        <td>{{disk.path|replace:\"/mnt/\":\"\"}}</td>\n			        <td>{{disk.serial}} ({{disk.device}})</td>\n			        <td><input type=\"checkbox\" data-ng-checked=\"{{vm.fromDisk[disk.path]}}\" data-ng-model=\"vm.fromDisk[disk.path]\" data-ng-change=\"vm.checkFrom(disk.path)\"/> </td>\n			        <td><input type=\"checkbox\" data-ng-checked=\"{{vm.toDisk[disk.path]}}\" data-ng-model=\"vm.toDisk[disk.path]\" data-ng-change=\"vm.checkTo(disk.path)\"/> </td>\n			        <td>{{disk.size|humanBytes}}</td>\n			        <td>{{disk.free|humanBytes}}</td>\n			        <td>\n			            <div class=\"progress\">\n			                <span style=\"width: {{ ((disk.size - disk.free) / disk.size ) | percentage}}\"></span>\n			            </div>\n			        </td>\n			        <td>\n			            <span data-ng-class=\"{label: disk.newFree !== disk.free, \'label-success\': disk.newFree !== disk.free}\">{{disk.newFree|humanBytes}}</span>\n			        </td>				\n				</tr>\n                <tr>\n                    <td colspan=\"4\">TOTAL</td>\n                    <td>{{vm.condition.size|humanBytes}}</td>\n                    <td>{{vm.condition.free|humanBytes}}</td>\n                    <td>\n                        <div class=\"progress\">\n                            <span style=\"width: {{ ((vm.condition.size-vm.condition.free) / vm.condition.size ) | percentage}}\"></span>\n                        </div>\n                    </td>\n                    <td>{{vm.condition.free|humanBytes}}</td>\n                </tr>\n			</tbody>\n			</table>\n		</section>\n");}]);