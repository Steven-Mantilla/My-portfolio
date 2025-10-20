#!/usr/bin/env python3
"""
Backend API Testing for Steven's Portfolio Website
Tests the contact form API endpoint functionality
"""

import requests
import json
import os
from datetime import datetime

# Get backend URL from frontend environment
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("❌ Could not get backend URL from frontend/.env")
    exit(1)

API_URL = f"{BASE_URL}/api"
print(f"🔗 Testing API at: {API_URL}")

def test_valid_contact_submission():
    """Test Case 1: Valid Contact Form Submission"""
    print("\n📝 Test 1: Valid Contact Form Submission")
    
    payload = {
        "name": "John Recruiter",
        "email": "john.recruiter@company.com",
        "message": "Hi Steven, I'm interested in discussing a full-stack developer position. Your projects look impressive!"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("id") and data.get("message"):
                print("✅ Valid submission test PASSED")
                return True, data.get("id")
            else:
                print("❌ Valid submission test FAILED - Missing required response fields")
                return False, None
        else:
            print(f"❌ Valid submission test FAILED - Expected 200, got {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ Valid submission test FAILED - Exception: {e}")
        return False, None

def test_invalid_email_format():
    """Test Case 2: Invalid Email Format"""
    print("\n📧 Test 2: Invalid Email Format")
    
    payload = {
        "name": "Test User",
        "email": "invalid-email",
        "message": "This is a test message with more than 10 characters"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ Invalid email test PASSED")
            return True
        else:
            print(f"❌ Invalid email test FAILED - Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Invalid email test FAILED - Exception: {e}")
        return False

def test_missing_required_fields():
    """Test Case 3: Missing Required Fields"""
    print("\n🚫 Test 3: Missing Required Fields (name)")
    
    payload = {
        "email": "test@example.com",
        "message": "Test message with sufficient length"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [400, 422]:
            print("✅ Missing required fields test PASSED")
            return True
        else:
            print(f"❌ Missing required fields test FAILED - Expected 400/422, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Missing required fields test FAILED - Exception: {e}")
        return False

def test_short_message():
    """Test Case 4: Short Message (< 10 characters)"""
    print("\n📏 Test 4: Short Message Validation")
    
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hi"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            if "10 characters" in data.get("detail", ""):
                print("✅ Short message test PASSED")
                return True
            else:
                print("❌ Short message test FAILED - Wrong error message")
                return False
        else:
            print(f"❌ Short message test FAILED - Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Short message test FAILED - Exception: {e}")
        return False

def test_retrieve_contact_messages(expected_id=None):
    """Test Case 5: Retrieve Contact Messages"""
    print("\n📋 Test 5: Retrieve Contact Messages")
    
    try:
        response = requests.get(f"{API_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "messages" in data:
                messages = data["messages"]
                print(f"✅ Retrieved {len(messages)} messages")
                
                # Check if our test message is there
                if expected_id:
                    found_message = False
                    for msg in messages:
                        if msg.get("id") == expected_id:
                            found_message = True
                            print(f"✅ Found test message with ID: {expected_id}")
                            break
                    
                    if not found_message:
                        print(f"⚠️  Test message with ID {expected_id} not found in retrieved messages")
                
                return True
            else:
                print("❌ Retrieve messages test FAILED - Missing success or messages field")
                return False
        else:
            print(f"❌ Retrieve messages test FAILED - Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Retrieve messages test FAILED - Exception: {e}")
        return False

def test_api_connectivity():
    """Test basic API connectivity"""
    print("\n🔌 Testing API Connectivity")
    
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ API connectivity test PASSED")
            return True
        else:
            print(f"❌ API connectivity test FAILED - Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ API connectivity test FAILED - Exception: {e}")
        return False

def main():
    """Run all contact form API tests"""
    print("🚀 Starting Contact Form API Tests")
    print("=" * 50)
    
    results = []
    test_message_id = None
    
    # Test 0: Basic connectivity
    results.append(("API Connectivity", test_api_connectivity()))
    
    # Test 1: Valid submission
    success, message_id = test_valid_contact_submission()
    results.append(("Valid Contact Submission", success))
    if success:
        test_message_id = message_id
    
    # Test 2: Invalid email
    results.append(("Invalid Email Format", test_invalid_email_format()))
    
    # Test 3: Missing fields
    results.append(("Missing Required Fields", test_missing_required_fields()))
    
    # Test 4: Short message
    results.append(("Short Message Validation", test_short_message()))
    
    # Test 5: Retrieve messages
    results.append(("Retrieve Contact Messages", test_retrieve_contact_messages(test_message_id)))
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests PASSED! Contact form API is working correctly.")
        return True
    else:
        print("⚠️  Some tests FAILED. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)