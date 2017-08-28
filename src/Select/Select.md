### API

| Parameter | description | type | default value | is required |
|------|------|------|--------|--------|
| Data | option data | array | `[]` | yes |
| Value | The selected value, when the tag type, you can pass in the array | any | `null` | no |
| Index | select index | any | `null` | no |
| Disabled | disabled component | bool | `false` | no |
| Placeholder | default prompt copy | string | `` please select `` | no |
| SearchPlaceholder | search box default copy | string | `` `` | no |
| EmptyText | empty list hints | string | `'no matches found'` | no |
| Trigger | Custom Trigger | function | `Select.SelectTrigger` | No |
| OptionText | custom option to display the corresponding key of the copy, such as {id: 1, name: 'copy'}, set optionText = "name" | string | `'text'` | no |
| OptionValue | the value of the custom option corresponding to the key, such as {id: 1, name: 'copy'}, set optionValue = "id" | string | `` value '
| OnChange | Select the changed callback function | function | `noop` ​​| No |
| OnDelete | delete the tag after the callback function | function | `noop` ​​| no |
| Filter | filter function, set the filter function after the opening | function | `null` | no |
| MaxToShow | Set the maximum number of options in the filter when there are filters | number | -- | no |
| OnAsyncFilter | Asynchronously set filtered data | function | `null` | No |
| OnEmptySelected | Select the callback when the filter is empty | function | `noop` ​​| No |
| OnOpen | when the callback | function | `noop` ​​| no |
| ClassName | optional, custom trigger additional class name | string | `  ` | no |
| PopupClassName | optional, custom popup class name | string | `` `` | no |
| Prefix | custom prefix | string | `` boldrui'` | no |

`If ​​both data and children are used at the same time, data will cover the children, mainly to be able to receive asynchronous data directly to change the data property to change the options. `
