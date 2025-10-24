# AuditLogManagementApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAllAuditLogs**](#getallauditlogs) | **GET** /api/audit-logs | Lấy tất cả audit logs|
|[**getAuditLogById**](#getauditlogbyid) | **GET** /api/audit-logs/{id} | Lấy audit log theo ID|
|[**getAuditLogsByAction**](#getauditlogsbyaction) | **GET** /api/audit-logs/action/{action} | Lấy audit logs theo action|
|[**getAuditLogsByDateRange**](#getauditlogsbydaterange) | **GET** /api/audit-logs/date-range | Lấy audit logs theo khoảng thời gian|
|[**getAuditLogsByEntity**](#getauditlogsbyentity) | **GET** /api/audit-logs/entity/{entityType}/{entityId} | Lấy audit logs của một entity cụ thể|
|[**getAuditLogsByEntityType**](#getauditlogsbyentitytype) | **GET** /api/audit-logs/entity-type/{entityType} | Lấy audit logs theo loại entity|
|[**getAuditLogsByUser**](#getauditlogsbyuser) | **GET** /api/audit-logs/user/{userId} | Lấy audit logs theo user|
|[**getAuditLogsByUserAndDateRange**](#getauditlogsbyuseranddaterange) | **GET** /api/audit-logs/user/{userId}/date-range | Lấy audit logs của user theo khoảng thời gian|

# **getAllAuditLogs**
> Array<AuditLogResponse> getAllAuditLogs()

Lấy toàn bộ nhật ký hoạt động, sắp xếp theo thời gian mới nhất. Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

const { status, data } = await apiInstance.getAllAuditLogs();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AuditLogResponse>**

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

# **getAuditLogById**
> AuditLogResponse getAuditLogById()

Lấy thông tin chi tiết của một audit log. Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**AuditLogResponse**

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

# **getAuditLogsByAction**
> Array<AuditLogResponse> getAuditLogsByAction()

Lấy nhật ký theo hành động (CREATE, UPDATE, DELETE). Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let action: string; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogsByAction(
    action
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **action** | [**string**] |  | defaults to undefined|


### Return type

**Array<AuditLogResponse>**

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

# **getAuditLogsByDateRange**
> Array<AuditLogResponse> getAuditLogsByDateRange()

Lấy nhật ký trong khoảng thời gian cụ thể. Format: yyyy-MM-dd\'T\'HH:mm:ss. Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let startDate: string; // (default to undefined)
let endDate: string; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogsByDateRange(
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | defaults to undefined|
| **endDate** | [**string**] |  | defaults to undefined|


### Return type

**Array<AuditLogResponse>**

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

# **getAuditLogsByEntity**
> Array<AuditLogResponse> getAuditLogsByEntity()

Lấy tất cả nhật ký thay đổi của một entity cụ thể (VD: Order #123). Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let entityType: string; // (default to undefined)
let entityId: number; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogsByEntity(
    entityType,
    entityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entityType** | [**string**] |  | defaults to undefined|
| **entityId** | [**number**] |  | defaults to undefined|


### Return type

**Array<AuditLogResponse>**

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

# **getAuditLogsByEntityType**
> Array<AuditLogResponse> getAuditLogsByEntityType()

Lấy nhật ký theo loại entity (Order, User, Payment, Service, etc.). Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let entityType: string; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogsByEntityType(
    entityType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entityType** | [**string**] |  | defaults to undefined|


### Return type

**Array<AuditLogResponse>**

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

# **getAuditLogsByUser**
> Array<AuditLogResponse> getAuditLogsByUser()

Lấy tất cả nhật ký hoạt động của một user cụ thể. Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let userId: number; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogsByUser(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**Array<AuditLogResponse>**

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

# **getAuditLogsByUserAndDateRange**
> Array<AuditLogResponse> getAuditLogsByUserAndDateRange()

Lấy nhật ký của một user trong khoảng thời gian cụ thể. Format: yyyy-MM-dd\'T\'HH:mm:ss. Chỉ ADMIN mới có quyền truy cập.

### Example

```typescript
import {
    AuditLogManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditLogManagementApi(configuration);

let userId: number; // (default to undefined)
let startDate: string; // (default to undefined)
let endDate: string; // (default to undefined)

const { status, data } = await apiInstance.getAuditLogsByUserAndDateRange(
    userId,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **startDate** | [**string**] |  | defaults to undefined|
| **endDate** | [**string**] |  | defaults to undefined|


### Return type

**Array<AuditLogResponse>**

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

