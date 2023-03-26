import ButtonHighlightIcon from "@/assets/widgetCover/button-highlight.svg"
import InputHighlightIcon from "@/assets/widgetCover/input-highlight.svg"
import TableHighlightIcon from "@/assets/widgetCover/table-highlight.svg"
import { GUIDE_COMPONENTS } from "@/config/guide/index"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { MysqlLikeAction } from "@/redux/currentApp/action/mysqlLikeAction"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { guideActions } from "@/redux/guide/guideSlice"
import store from "@/store"
import { WidgetConfig } from "@/widgetLibrary/widgetBuilder"

const enum GUIDE_SELECT {
  "INPUT_WIDGET",
  "BUTTON_WIDGET",
  "TABLE_WIDGET",
}

export const SELECT_WIDGET_ITEM = {
  INPUT_WIDGET: {
    highlightIcon: InputHighlightIcon,
    ...WidgetConfig["INPUT_WIDGET"].config,
  },
  BUTTON_WIDGET: {
    highlightIcon: ButtonHighlightIcon,
    ...WidgetConfig["BUTTON_WIDGET"].config,
  },
  TABLE_WIDGET: {
    highlightIcon: TableHighlightIcon,
    ...WidgetConfig["TABLE_WIDGET"].config,
  },
}

export type SelectWidget = keyof typeof SELECT_WIDGET_ITEM

export const GUIDE_SELECT_WIDGET = Object.keys(
  SELECT_WIDGET_ITEM,
) as SelectWidget[]

export const GUIDE_SQL_QUERY =
  "select * \n" +
  "from users\n" +
  "join orders\n" +
  "on users.id = orders.id\n" +
  "where {{!input1.value}} or lower(users.name) like '%{{input1.value.toLowerCase()}}%'"

export const GUIDE_STEP = [
  {
    // 0
    step: 0.1,
    titleKey: "editor.tutorial.panel.onboarding_app.drag_title",
    descKey: "editor.tutorial.panel.onboarding_app.drag_input",
    widgetType: "INPUT_WIDGET",
    selector: `[data-onboarding-element="INPUT_WIDGET"]`,
    reduxAction: "components/addComponentReducer",
    doItForMe: () => {
      store.dispatch(componentsActions.addComponentReducer(GUIDE_COMPONENTS))
      store.dispatch(guideActions.updateCurrentStepReducer(3))
    },
  },
  {
    step: 0.2,
    titleKey: "",
    descKey: "",
    selector: "",
    widgetType: "BUTTON_WIDGET",
    reduxAction: "components/addComponentReducer",
  },
  {
    step: 0.3,
    titleKey: "",
    descKey: "",
    selector: "",
    widgetType: "TABLE_WIDGET",
    reduxAction: "components/addComponentReducer",
  },
  {
    // 1
    step: 1,
    titleKey: "editor.tutorial.panel.onboarding_app.modify_action_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.modify_action_description_modify",
    selector: ".postgresql1-query",
    reduxAction: "config/updateCachedAction",
    doItForMe: () => {
      const currentAction = getCachedAction(store.getState())!!
      const mysqlContent = currentAction.content as MysqlLikeAction
      store.dispatch(
        configActions.updateCachedAction({
          ...currentAction,
          content: {
            ...mysqlContent,
            query: GUIDE_SQL_QUERY,
          },
        }),
      )
    },
  },
  {
    step: 2,
    titleKey: "editor.tutorial.panel.onboarding_app.modify_action_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.modify_action_description_click",
    selector: ".postgresql1-run",
    reduxAction: "guideActions/updateNextStepReducer",
    doItForMe: () => {
      const element = document.querySelector(
        ".postgresql1-run",
      ) as HTMLButtonElement
      element?.click()
      store.dispatch(guideActions.updateNextStepReducer())
    },
  },
  {
    // 2
    step: 3,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_select",
    selector: `[data-displayname="table1"]`,
    displayName: `table1`,
    reduxAction: "config/updateSelectedComponent",
    doItForMe: () => {
      store.dispatch(configActions.updateSelectedComponent(["table1"]))
    },
  },
  {
    step: 4,
    titleKey: "editor.tutorial.panel.onboarding_app.display_data_title",
    descKey:
      "editor.tutorial.panel.onboarding_app.display_data_description_modify",
    selector: "table-data-source",
    doItForMe: () => {
      store.dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: "table1",
          updateSlice: {
            dataSourceJS: "{{postgresql1.data}}",
          },
        }),
      )
    },
  },
  {
    // 3
    step: 5,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_1",
    selector: `[data-displayname="button1"]`,
    displayName: `button1`,
    reduxAction: "config/updateSelectedComponent",
    doItForMe: () => {
      store.dispatch(configActions.updateSelectedComponent(["button1"]))
    },
  },
  {
    step: 6,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_2",
    selector: "button-interaction-event-handler",
    doItForMe: () => {
      // whole event
      store.dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: "button1",
          updateSlice: {
            events: [
              {
                id: "events-3e2c0390-b4f7-4570-9f4b-93c5d59e4c13",
                eventType: "click",
                queryID: "query1",
                actionType: "datasource",
                method: "trigger",
              },
            ],
          },
        }),
      )
    },
  },
  {
    step: 7,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_3",
    selector: "button-interaction-event-handler",
    doItForMe: () => {
      //
      const element = document.querySelector(
        ".button-interaction-event-handler",
      ) as HTMLButtonElement
      element?.click()
      store.dispatch(guideActions.updateNextStepReducer())
    },
  },
  {
    step: 8,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_4",
    selector: "button-interaction-event-handler-action",
    doItForMe: () => {
      store.dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: "button1",
          updateSlice: {
            "events.0.actionType": "datasource",
          },
        }),
      )
    },
  },
  {
    step: 9,
    titleKey: "editor.tutorial.panel.onboarding_app.event_handler_title",
    descKey: "editor.tutorial.panel.onboarding_app.event_handler_description_5",
    selector: "button-interaction-event-handler-query",
    doItForMe: () => {
      store.dispatch(
        componentsActions.updateComponentPropsReducer({
          displayName: "button1",
          updateSlice: {
            "events.0.queryID": "postgresql1",
          },
        }),
      )
    },
  },
  {
    // 4
    step: 10,
    titleKey: "editor.tutorial.panel.onboarding_app.test_it_title",
    descKey: "editor.tutorial.panel.onboarding_app.test_it_description",
    selector: "",
  },
]
