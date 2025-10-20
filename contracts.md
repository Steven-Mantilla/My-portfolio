# API Contracts & Backend Implementation Guide

## Overview
Backend implementation for Steven Kim Mantilla's Portfolio Website with MongoDB integration for contact form submissions.

---

## 1. Database Models

### ContactMessage Model
```python
{
  "id": "auto-generated-uuid",
  "name": "string (required)",
  "email": "string (required, validated)",
  "message": "string (required)",
  "timestamp": "datetime (auto)",
  "status": "string (default: 'unread')"
}
```

---

## 2. API Endpoints

### POST /api/contact
**Purpose:** Submit contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hi Steven, I'd like to discuss..."
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "id": "generated-uuid"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### GET /api/contact
**Purpose:** Retrieve all contact messages (for admin/portfolio owner)

**Response (200):**
```json
{
  "success": true,
  "messages": [
    {
      "id": "uuid-1",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Message text...",
      "timestamp": "2025-01-20T10:30:00Z",
      "status": "unread"
    }
  ]
}
```

---

## 3. Frontend-Backend Integration

### Files to Update

#### `/app/frontend/src/components/Contact.js`
**Current State:** Mock form submission with toast notification
**Changes Needed:**
- Replace mock setTimeout with actual API call to `/api/contact`
- Use axios to POST form data
- Handle success/error responses
- Show appropriate toast messages

**Implementation:**
```javascript
const response = await axios.post(`${API}/contact`, formData);
if (response.data.success) {
  toast({ title: "Message sent!", description: response.data.message });
  setFormData({ name: '', email: '', message: '' });
}
```

---

## 4. Mock Data Removal

### Files with Mock Data:
- `/app/frontend/src/mock.js` - Keep as is (used for static portfolio data)
- `/app/frontend/src/components/Contact.js` - Remove setTimeout mock, replace with API call

---

## 5. Backend Implementation Steps

1. **Create Model:** Define ContactMessage schema in `server.py`
2. **Create Endpoint:** Implement POST `/api/contact` with validation
3. **Create Endpoint:** Implement GET `/api/contact` (optional, for viewing messages)
4. **Validation:** Email format, required fields, message length
5. **Error Handling:** Proper error responses for invalid data
6. **Integration:** Update Contact.js to use backend API
7. **Testing:** Test form submission flow

---

## 6. Environment Variables
No new environment variables needed - using existing:
- `MONGO_URL` - Already configured
- `REACT_APP_BACKEND_URL` - Already configured

---

## 7. Success Criteria
✅ Contact form submits to backend API
✅ Messages stored in MongoDB
✅ Form validation works (frontend + backend)
✅ Success/error toasts display correctly
✅ Form clears after successful submission
✅ No console errors
