# NotificationsApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**countUnread**](#countunread) | **GET** /api/notifications/unread/count | Đếm thông báo chưa đọc|
|[**createNotification**](#createnotification) | **POST** /api/notifications | Tạo thông báo mới|
|[**deleteNotification**](#deletenotification) | **DELETE** /api/notifications/{id} | Xóa thông báo|
|[**getAllNotifications**](#getallnotifications) | **GET** /api/notifications | Lấy tất cả thông báo|
|[**getMyNotifications**](#getmynotifications) | **GET** /api/notifications/my | Lấy thông báo của tôi|
|[**getUnreadNotifications**](#getunreadnotifications) | **GET** /api/notifications/unread | Lấy thông báo chưa đọc|
|[**getUserNotificationsById**](#getusernotificationsbyid) | **GET** /api/notifications/user/{userId} | Lấy thông báo của user|
|[**markAllAsRead**](#markallasread) | **PATCH** /api/notifications/read-all | Đánh dấu tất cả đã đọc|
|[**markAsRead**](#markasread) | **PATCH** /api/notifications/{id}/read | Đánh dấu đã đọc|
|[**sendBulkNotifications**](#sendbulknotifications) | **POST** /api/notifications/bulk | Gửi thông báo hàng loạt|

# **countUnread**
> ApiResponseLong countUnread()

Đếm số thông báo chưa đọc

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.countUnread();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseLong**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createNotification**
> ApiResponseNotificationResponse createNotification(notificationRequest)

Tạo thông báo cho user (Admin/Staff only)

### Example

```typescript
import {
    NotificationsApi,
    Configuration,
    NotificationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let notificationRequest: NotificationRequest; //

const { status, data } = await apiInstance.createNotification(
    notificationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationRequest** | **NotificationRequest**|  | |


### Return type

**ApiResponseNotificationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteNotification**
> ApiResponseVoid deleteNotification()

Xóa thông báo

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteNotification(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseVoid**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllNotifications**
> ApiResponsePageNotificationResponse getAllNotifications()

Lấy tất cả thông báo trong hệ thống (Admin/Staff/Manager)

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getAllNotifications(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**ApiResponsePageNotificationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyNotifications**
> ApiResponsePageNotificationResponse getMyNotifications()

Lấy tất cả thông báo của user hiện tại

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getMyNotifications(
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**ApiResponsePageNotificationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUnreadNotifications**
> ApiResponseListNotificationResponse getUnreadNotifications()

Lấy tất cả thông báo chưa đọc của user hiện tại

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.getUnreadNotifications();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListNotificationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserNotificationsById**
> ApiResponsePageNotificationResponse getUserNotificationsById()

Lấy thông báo của một user cụ thể (Admin/Staff/Manager)

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let userId: number; // (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getUserNotificationsById(
    userId,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**ApiResponsePageNotificationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markAllAsRead**
> ApiResponseVoid markAllAsRead()

Đánh dấu tất cả thông báo đã đọc

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.markAllAsRead();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseVoid**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markAsRead**
> ApiResponseNotificationResponse markAsRead()

Đánh dấu thông báo đã đọc

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.markAsRead(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ApiResponseNotificationResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sendBulkNotifications**
> ApiResponseVoid sendBulkNotifications()

Gửi thông báo cho nhiều user (Admin only)

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let userIds: Array<number>; // (default to undefined)
let title: string; // (default to undefined)
let message: string; // (default to undefined)
let type: 'ORDER_CREATED' | 'ORDER_CONFIRMED' | 'ORDER_PROCESSING' | 'ORDER_READY' | 'ORDER_DELIVERING' | 'ORDER_COMPLETED' | 'ORDER_CANCELLED' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'PROMOTION' | 'SYSTEM' | 'OTHER'; // (default to undefined)

const { status, data } = await apiInstance.sendBulkNotifications(
    userIds,
    title,
    message,
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userIds** | **Array&lt;number&gt;** |  | defaults to undefined|
| **title** | [**string**] |  | defaults to undefined|
| **message** | [**string**] |  | defaults to undefined|
| **type** | [**&#39;ORDER_CREATED&#39; | &#39;ORDER_CONFIRMED&#39; | &#39;ORDER_PROCESSING&#39; | &#39;ORDER_READY&#39; | &#39;ORDER_DELIVERING&#39; | &#39;ORDER_COMPLETED&#39; | &#39;ORDER_CANCELLED&#39; | &#39;PAYMENT_SUCCESS&#39; | &#39;PAYMENT_FAILED&#39; | &#39;PROMOTION&#39; | &#39;SYSTEM&#39; | &#39;OTHER&#39;**]**Array<&#39;ORDER_CREATED&#39; &#124; &#39;ORDER_CONFIRMED&#39; &#124; &#39;ORDER_PROCESSING&#39; &#124; &#39;ORDER_READY&#39; &#124; &#39;ORDER_DELIVERING&#39; &#124; &#39;ORDER_COMPLETED&#39; &#124; &#39;ORDER_CANCELLED&#39; &#124; &#39;PAYMENT_SUCCESS&#39; &#124; &#39;PAYMENT_FAILED&#39; &#124; &#39;PROMOTION&#39; &#124; &#39;SYSTEM&#39; &#124; &#39;OTHER&#39;>** |  | defaults to undefined|


### Return type

**ApiResponseVoid**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

