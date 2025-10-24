# PasswordManagementApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**confirm2FAToggle**](#confirm2fatoggle) | **POST** /api/auth/security/2fa-toggle/confirm | 🌐 Xác nhận toggle 2FA|
|[**forgotPassword**](#forgotpassword) | **POST** /api/auth/forgot-password | 🌐 Quên mật khẩu (Bước 1)|
|[**resetPassword**](#resetpassword) | **POST** /api/auth/reset-password | 🌐 Reset mật khẩu (Bước 3)|
|[**validateResetToken**](#validateresettoken) | **GET** /api/auth/reset-password/validate | 🌐 Validate token reset (Bước 2)|
|[**validateToken**](#validatetoken) | **GET** /api/auth/security/2fa-toggle/validate | 🌐 Validate token toggle 2FA|

# **confirm2FAToggle**
> ApiResponseVoid confirm2FAToggle()

**Access:** 🌐 Public - Không cần authentication (verify qua token)  Xác nhận bật/tắt 2FA cho password change.  **Flow:** 1. User request toggle 2FA (authenticated endpoint) 2. System tạo token + send email 3. User click link trong email 4. Call API này để confirm 5. 2FA setting được cập nhật  **After Enable 2FA:** - User đổi password → Phải xác nhận qua email - Tăng bảo mật  **After Disable 2FA:** - User đổi password → Đổi ngay (chỉ cần old password) - Tiện lợi hơn  **Response:** - Success: Cập nhật 2FA setting thành công - Error: Token invalid/expired 

### Example

```typescript
import {
    PasswordManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordManagementApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.confirm2FAToggle(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


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

# **forgotPassword**
> ApiResponseVoid forgotPassword(forgotPasswordRequest)

**Access:** 🌐 Public - Không cần authentication  Gửi email reset password cho user quên mật khẩu.  **Email Verification:** - Check format email - Check disposable email (block) - Check MX records (domain tồn tại)  **Flow:** 1. User nhập email 2. System verify email 3. Tạo token (30 phút) 4. Gửi email với link reset  **Security:** - Không tiết lộ email có tồn tại hay không - Luôn return success message - Token one-time use  **Response:** - Success message (dù email có tồn tại hay không) 

### Example

```typescript
import {
    PasswordManagementApi,
    Configuration,
    ForgotPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordManagementApi(configuration);

let forgotPasswordRequest: ForgotPasswordRequest; //

const { status, data } = await apiInstance.forgotPassword(
    forgotPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordRequest** | **ForgotPasswordRequest**|  | |


### Return type

**ApiResponseVoid**

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

# **resetPassword**
> ApiResponseVoid resetPassword(resetPasswordRequest)

**Access:** 🌐 Public - Không cần authentication  Reset password với token từ email.  **Flow:** 1. User nhập password mới + confirm 2. System validate token 3. Check password match 4. Update password (BCrypt hash) 5. Mark token as used 6. User có thể đăng nhập với password mới  **Validations:** - Token valid (chưa hết hạn, chưa dùng) - Password >= 8 ký tự - Password match confirm password  **Security:** - Token one-time use - Password hashed with BCrypt - Old tokens deleted after success  **Response:** - Success: Đổi password thành công - Error: Token invalid hoặc passwords không match 

### Example

```typescript
import {
    PasswordManagementApi,
    Configuration,
    ResetPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordManagementApi(configuration);

let resetPasswordRequest: ResetPasswordRequest; //

const { status, data } = await apiInstance.resetPassword(
    resetPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordRequest** | **ResetPasswordRequest**|  | |


### Return type

**ApiResponseVoid**

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

# **validateResetToken**
> ApiResponseBoolean validateResetToken()

**Access:** 🌐 Public - Không cần authentication  Kiểm tra token reset password còn hợp lệ không.  **Use Case:** - Frontend check token khi user click link trong email - Hiển thị form reset password nếu valid - Hiển thị error nếu expired/invalid  **Validations:** - Token tồn tại trong DB - Token chưa hết hạn (30 phút) - Token chưa được sử dụng  **Response:** - true: Token hợp lệ, cho phép reset - false: Token expired/invalid 

### Example

```typescript
import {
    PasswordManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordManagementApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.validateResetToken(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseBoolean**

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

# **validateToken**
> ApiResponseVoid validateToken()

**Access:** 🌐 Public - Không cần authentication  Validate token để bật/tắt 2FA setting.  **Context:** - User request bật/tắt 2FA cho password change - System gửi email xác nhận - User click link trong email - Frontend call API này để validate  **What is 2FA for Password Change?** - Khi BẬT: Đổi password phải xác nhận qua email - Khi TẮT: Đổi password ngay lập tức (chỉ cần password cũ)  **Response:** - Success: Token valid - Error: Token expired/invalid 

### Example

```typescript
import {
    PasswordManagementApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PasswordManagementApi(configuration);

let token: string; // (default to undefined)

const { status, data } = await apiInstance.validateToken(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] |  | defaults to undefined|


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

