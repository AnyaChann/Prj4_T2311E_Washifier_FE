# EmailVerificationApi

All URIs are relative to *http://localhost:8080/api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deepVerify**](#deepverify) | **GET** /api/auth/email/verify-deep | Xác thực email sâu (SMTP)|
|[**fullVerify**](#fullverify) | **GET** /api/auth/email/verify | 🌐 Full email verification|
|[**quickCheck**](#quickcheck) | **GET** /api/auth/email/check | 🌐 Quick check email|

# **deepVerify**
> ApiResponseMapStringObject deepVerify()

Check đầy đủ bao gồm SMTP verification. Chậm, dùng cẩn thận!

### Example

```typescript
import {
    EmailVerificationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmailVerificationApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.deepVerify(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseMapStringObject**

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

# **fullVerify**
> ApiResponseMapStringObject fullVerify()

**Access:** 🌐 Public - Không cần authentication  Xác thực email đầy đủ: Format + Disposable + MX records.  **3 Levels Check:** 1. ✅ Format validation (RFC 5322) 2. ✅ Disposable email check (block tempmail) 3. ✅ MX records check (domain có thể nhận email)  **Speed:** 50-200ms (DNS query)  **Use Case:** - Verify email trước khi register - Ensure email có thể nhận mail - Block fake domains  **Examples:** - ✅ test@gmail.com → Valid (has MX records) - ❌ test@tempmail.com → Invalid (disposable) - ❌ test@fakefake123.com → Invalid (no MX records)  **Response:** ```json {   \"email\": \"test@gmail.com\",   \"validFormat\": true,   \"isDisposable\": false,   \"hasMXRecords\": true,   \"mxRecords\": [\"gmail-smtp-in.l.google.com\"],   \"isValid\": true,   \"reason\": \"Email hợp lệ và có thể nhận email\" } ``` 

### Example

```typescript
import {
    EmailVerificationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmailVerificationApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.fullVerify(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseMapStringObject**

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

# **quickCheck**
> ApiResponseMapStringObject quickCheck()

**Access:** 🌐 Public - Không cần authentication  Kiểm tra nhanh email format và disposable email.  **Checks:** - ✅ Format validation (RFC 5322) - ✅ Disposable email check (tempmail, guerrillamail, etc.)  **Speed:** < 1ms (very fast)  **Use Case:** - Frontend real-time validation - Check email trước khi đăng ký - Block disposable emails  **Response:** ```json {   \"email\": \"test@gmail.com\",   \"validFormat\": true,   \"isDisposable\": false,   \"isValid\": true } ``` 

### Example

```typescript
import {
    EmailVerificationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EmailVerificationApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.quickCheck(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseMapStringObject**

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

