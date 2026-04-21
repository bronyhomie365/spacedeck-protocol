from setuptools import setup, find_packages

setup(
    name="spacedeck-sdk",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "pydantic>=2.0.0",
        "httpx>=0.25.0",
    ],
)
