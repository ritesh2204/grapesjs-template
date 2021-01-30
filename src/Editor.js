import React, { Fragment, useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";

import grapesjs from "grapesjs";

const Editor = () => {
  useEffect(() => {
    grapesjs.init({
      container: "#gjs",
      fromElement: true,
      height: "90vh",
      width: "auto",
      storageManager: false,
      panels: {
        id: "basic-actions",
        el: ".panel__basic-actions",
        buttons: [
          {
            id: "visibility",
            active: true, // active by default
            className: "btn-toggle-borders",
            label: "<u>B</u>",
            command: "sw-visibility" // Built-in command
          },
          {
            id: "export",
            className: "btn-open-export",
            label: "Exp",
            command: "export-template",
            context: "export-template" // For grouping context of buttons from the same panel
          },
          {
            id: "show-json",
            className: "btn-show-json",
            label: "JSON",
            context: "show-json",
            command(editor) {
              editor.Modal.setTitle("Components JSON")
                .setContent(
                  `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
                )
                .open();
            }
          }
        ]
      },

      plugins: ["gjs-blocks-basic", "gjs-preset-newsletter"],

      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { class: "gjs-block-section" },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`
          },
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>'
          },
          {
            id: "image",
            label: "Image",
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: "image" },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true
          },
          {
            label: "2 Columns",
            content:
              '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
              '<div class="row-cell" data-gjs-draggable=".row"></div>' +
              '<div class="row-cell" data-gjs-draggable=".row"></div>' +
              "</div>"
          }
        ]
      }
    });
    console.log("tthis is a use effect");
  }, []);

  return (
    <Fragment>
      <div class="panel__top">
        <div class="panel__basic-actions"></div>
      </div>
      <div id="gjs">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ">Hello World Component!</div>
            <div className="col-md-6 ">
              <p>Hello world</p>
            </div>
          </div>
        </div>
      </div>
      <div id="blocks"></div>
    </Fragment>
  );
};

export default Editor;
