from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from bs4 import BeautifulSoup

import time

SUBJECT_URL = "https://registrar.ucla.edu/academics/course-descriptions"
COURSES_URL = "https://registrar.ucla.edu/academics/course-descriptions?search="

# Get html from dynamic web page.
def get_html(url):
    parent_window = driver.current_window_handle
    driver.switch_to.new_window("tab")
    
    driver.get(url)
    driver.refresh()
    time.sleep(1) # Give web page time to load. Not 100% reliable.
    html = driver.page_source
    
    driver.close()
    driver.switch_to.window(parent_window)
    
    return html

# Scrape courses for a subject area and output to file.
def scrape_courses(subject_area):
    url_appendage = subject_area.replace(" ", "+")
    url = COURSES_URL + url_appendage
    
    html = get_html(url)
    
    # Manually determined points to cut html at.
    start_str = '<div class="course-descriptions-subject-area">'
    end_str = '<div class="page-menu">'
    start_index = html.find(start_str)
    end_index = html.find(end_str)
    
    html = html[start_index: end_index]
    soup = BeautifulSoup(html, "html.parser")
    text = soup.prettify()
    
    path = "course-descriptions-data/"
    filename = path + subject_area.replace(" ", "_").replace("/", "-").lower() + ".txt"
    
    with open(filename, "w") as f:
        for line in text.splitlines():
            stripped = line.strip()
            if len(stripped) > 0 and stripped[0] != "<":
                f.write(stripped + "\n")
    
# main
driver = webdriver.Firefox() # Edit to use preferred browser.

with open("subjects.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        scrape_courses(line.strip())

driver.quit()
