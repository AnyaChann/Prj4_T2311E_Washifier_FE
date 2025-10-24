# ShipperManagementApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**activateShipper**](#activateshipper) | **PATCH** /api/shippers/{id}/activate | Kích hoạt shipper|
|[**createShipper**](#createshipper) | **POST** /api/shippers | Tạo mới shipper|
|[**deactivateShipper**](#deactivateshipper) | **PATCH** /api/shippers/{id}/deactivate | Vô hiệu hóa shipper|
|[**deleteShipper**](#deleteshipper) | **DELETE** /api/shippers/{id} | Xóa shipper|
|[**getActiveShippers**](#getactiveshippers) | **GET** /api/shippers/active | Lấy danh sách shippers đang hoạt động|
|[**getAllShippers**](#getallshippers) | **GET** /api/shippers | Lấy danh sách shipper|
|[**getShipperById**](#getshipperbyid) | **GET** /api/shippers/{id} | Lấy thông tin shipper theo ID|
|[**getShipperStatistics**](#getshipperstatistics) | **GET** /api/shippers/{id}/statistics | Lấy thống kê shipments của shipper|
|[**getShippersByName**](#getshippersbyname) | **GET** /api/shippers/name/{name} | Tìm shippers theo tên|
|[**getShippersByPhone**](#getshippersbyphone) | **GET** /api/shippers/phone/{phone} | Tìm shippers theo số điện thoại|
|[**updateShipper**](#updateshipper) | **PUT** /api/shippers/{id} | Cập nhật thông tin shipper|

# **activateShipper**
> ShipperResponse activateShipper()

Đặt trạng thái shipper thành active (isActive = true). Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.activateShipper(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ShipperResponse**

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

# **createShipper**
> ShipperResponse createShipper(shipperRequest)

Tạo tài khoản shipper mới. Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration,
    ShipperRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let shipperRequest: ShipperRequest; //

const { status, data } = await apiInstance.createShipper(
    shipperRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **shipperRequest** | **ShipperRequest**|  | |


### Return type

**ShipperResponse**

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

# **deactivateShipper**
> ShipperResponse deactivateShipper()

Đặt trạng thái shipper thành inactive (isActive = false). Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deactivateShipper(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ShipperResponse**

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

# **deleteShipper**
> deleteShipper()

Xóa shipper khỏi hệ thống. Chỉ xóa được nếu shipper không có shipments đang giao. Yêu cầu quyền ADMIN.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.deleteShipper(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActiveShippers**
> Array<ShipperResponse> getActiveShippers()

Lấy danh sách các shippers đang trong trạng thái hoạt động (isActive = true). Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

const { status, data } = await apiInstance.getActiveShippers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ShipperResponse>**

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

# **getAllShippers**
> Array<ShipperResponse> getAllShippers()

Lấy danh sách tất cả shipper. Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

const { status, data } = await apiInstance.getAllShippers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ShipperResponse>**

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

# **getShipperById**
> ShipperResponse getShipperById()

Lấy thông tin chi tiết của một shipper. Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getShipperById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ShipperResponse**

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

# **getShipperStatistics**
> ShipperStatistics getShipperStatistics()

Lấy thống kê số lượng shipments: tổng số, đã hoàn thành, đang giao hàng. Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getShipperStatistics(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ShipperStatistics**

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

# **getShippersByName**
> Array<ShipperResponse> getShippersByName()

Tìm kiếm shippers có tên chứa từ khóa (không phân biệt chữ hoa/thường). Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let name: string; // (default to undefined)

const { status, data } = await apiInstance.getShippersByName(
    name
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] |  | defaults to undefined|


### Return type

**Array<ShipperResponse>**

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

# **getShippersByPhone**
> Array<ShipperResponse> getShippersByPhone()

Tìm kiếm shippers có số điện thoại chứa từ khóa. Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let phone: string; // (default to undefined)

const { status, data } = await apiInstance.getShippersByPhone(
    phone
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **phone** | [**string**] |  | defaults to undefined|


### Return type

**Array<ShipperResponse>**

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

# **updateShipper**
> ShipperResponse updateShipper(shipperRequest)

Cập nhật thông tin của shipper. Yêu cầu quyền ADMIN, STAFF hoặc MANAGER.

### Example

```typescript
import {
    ShipperManagementApi,
    Configuration,
    ShipperRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ShipperManagementApi(configuration);

let id: number; // (default to undefined)
let shipperRequest: ShipperRequest; //

const { status, data } = await apiInstance.updateShipper(
    id,
    shipperRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **shipperRequest** | **ShipperRequest**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**ShipperResponse**

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

