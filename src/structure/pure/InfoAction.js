/* InfoAction.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 *
 * @module InfoAction 
 * @title  CometVisu InfoAction 
 */


/**
 * The infoaction widget is a combination of an info/text widget and an "action"-widget.
 * 
 * Use case: if you have a group of lights, you can show the number of turned on lights
 * and control the whole group in one widget
 *
 * @example <caption>Example of the basic configuration structure of this widget</caption>
 * <infoaction>
 * 	<widgetinfo>
 * 
 *  </widgetinfo>
 *  <widgetaction>
 *  
 *  </widgetaction>
 * </infoaction>
 *
 * @module structure/pure/InfoAction
 * @requires structure/pure
 * @author Tobias Bräutigam
 * @since 2015
 */
define( ['_common' ], function( design ) {
  "use strict";

  design.basicdesign.addCreator("infoaction", {
      /**
       * Creates the InfoAction widget
       *
       * @method create
       * @param {} element
       * @param {} path
       * @param {} flavour
       * @param {} type
       * @return String - HTML representation if the widget as string
       */
      create: function(element, path, flavour, type) {
        return createWidget(false, element, path, flavour, type);
      }
    });
  /**
   * Creates the InfoAction widget
   *
   * @method createWidget
   * @param {} isInfo
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return String - HTML representation if the widget as string
   */
  function createWidget(isInfo, element, path, flavour, type) {
      var $e = $(element);

      // create the main structure
      var ret_val = templateEngine.design.createDefaultWidget('infoaction', $e, path, flavour, type);
      // and fill in widget specific data
      var data = templateEngine.widgetDataInsert( path, {
        content           : getWidgetElements($e, path)
      } );
      ret_val += data.content;
      return ret_val + '</div>';
    }
   
  /**
   * Description
   * @method getWidgetElements
   * @param {} xmlElement
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return ret_val
   */
  function getWidgetElements(xmlElement, path, flavour, type) {
      var infoWidget = $('widgetinfo > *', xmlElement).first()[0];
      var actionWidget = $('widgetaction > *', xmlElement).first()[0];
      var data = templateEngine.widgetDataInsert( path+"_0", {
        containerClass           : "widgetinfo"
      } );
      data = templateEngine.widgetDataInsert( path+"_1", {
        containerClass           : "widgetaction"
      } );
      
      var ret_val = templateEngine.create_pages(infoWidget, path+"_0", flavour, infoWidget.nodeName);
      ret_val += templateEngine.create_pages(actionWidget, path+"_1", flavour, actionWidget.nodeName);
      return ret_val;
    }
});
