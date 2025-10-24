# SoftDeleteApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDeletedBranches**](#getdeletedbranches) | **GET** /api/soft-delete/branches | |
|[**getDeletedOrders**](#getdeletedorders) | **GET** /api/soft-delete/orders | |
|[**getDeletedPromotions**](#getdeletedpromotions) | **GET** /api/soft-delete/promotions | |
|[**getDeletedServices**](#getdeletedservices) | **GET** /api/soft-delete/services | |
|[**getDeletedShippers**](#getdeletedshippers) | **GET** /api/soft-delete/shippers | |
|[**getDeletedUsers**](#getdeletedusers) | **GET** /api/soft-delete/users | |
|[**permanentlyDeleteBranch**](#permanentlydeletebranch) | **DELETE** /api/soft-delete/branches/{id}/permanent | |
|[**permanentlyDeleteOrder**](#permanentlydeleteorder) | **DELETE** /api/soft-delete/orders/{id}/permanent | |
|[**permanentlyDeletePromotion**](#permanentlydeletepromotion) | **DELETE** /api/soft-delete/promotions/{id}/permanent | |
|[**permanentlyDeleteService**](#permanentlydeleteservice) | **DELETE** /api/soft-delete/services/{id}/permanent | |
|[**permanentlyDeleteShipper**](#permanentlydeleteshipper) | **DELETE** /api/soft-delete/shippers/{id}/permanent | |
|[**permanentlyDeleteUser**](#permanentlydeleteuser) | **DELETE** /api/soft-delete/users/{id}/permanent | |
|[**restoreBranch**](#restorebranch) | **PUT** /api/soft-delete/branches/{id}/restore | |
|[**restoreOrder**](#restoreorder) | **PUT** /api/soft-delete/orders/{id}/restore | |
|[**restorePromotion**](#restorepromotion) | **PUT** /api/soft-delete/promotions/{id}/restore | |
|[**restoreService**](#restoreservice) | **PUT** /api/soft-delete/services/{id}/restore | |
|[**restoreShipper**](#restoreshipper) | **PUT** /api/soft-delete/shippers/{id}/restore | |
|[**restoreUser**](#restoreuser) | **PUT** /api/soft-delete/users/{id}/restore | |

# **getDeletedBranches**
> ApiResponseListBranchResponse getDeletedBranches()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

const { status, data } = await apiInstance.getDeletedBranches();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListBranchResponse**

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

# **getDeletedOrders**
> ApiResponseListOrderResponse getDeletedOrders()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

const { status, data } = await apiInstance.getDeletedOrders();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListOrderResponse**

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

# **getDeletedPromotions**
> ApiResponseListPromotionResponse getDeletedPromotions()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

const { status, data } = await apiInstance.getDeletedPromotions();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListPromotionResponse**

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

# **getDeletedServices**
> ApiResponseListServiceResponse getDeletedServices()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

const { status, data } = await apiInstance.getDeletedServices();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListServiceResponse**

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

# **getDeletedShippers**
> ApiResponseListShipperResponse getDeletedShippers()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

const { status, data } = await apiInstance.getDeletedShippers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListShipperResponse**

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

# **getDeletedUsers**
> ApiResponseListUserResponse getDeletedUsers()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

const { status, data } = await apiInstance.getDeletedUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseListUserResponse**

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

# **permanentlyDeleteBranch**
> ApiResponseVoid permanentlyDeleteBranch()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.permanentlyDeleteBranch(
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

# **permanentlyDeleteOrder**
> ApiResponseVoid permanentlyDeleteOrder()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.permanentlyDeleteOrder(
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

# **permanentlyDeletePromotion**
> ApiResponseVoid permanentlyDeletePromotion()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.permanentlyDeletePromotion(
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

# **permanentlyDeleteService**
> ApiResponseVoid permanentlyDeleteService()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.permanentlyDeleteService(
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

# **permanentlyDeleteShipper**
> ApiResponseVoid permanentlyDeleteShipper()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.permanentlyDeleteShipper(
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

# **permanentlyDeleteUser**
> ApiResponseVoid permanentlyDeleteUser()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.permanentlyDeleteUser(
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

# **restoreBranch**
> ApiResponseVoid restoreBranch()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.restoreBranch(
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

# **restoreOrder**
> ApiResponseVoid restoreOrder()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.restoreOrder(
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

# **restorePromotion**
> ApiResponseVoid restorePromotion()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.restorePromotion(
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

# **restoreService**
> ApiResponseVoid restoreService()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.restoreService(
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

# **restoreShipper**
> ApiResponseVoid restoreShipper()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.restoreShipper(
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

# **restoreUser**
> ApiResponseVoid restoreUser()


### Example

```typescript
import {
    SoftDeleteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SoftDeleteApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.restoreUser(
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

